import path from 'node:path';

/**
 * Extract all hyperlink targets from raw source content.
 * Handles Markdown `[text](url)` syntax and HTML/Liquid `href="…"` attributes.
 *
 * @param {string} rawContent
 * @returns {Set<string>}
 */
function extractRawLinks(rawContent) {
	const links = new Set();

	// Markdown links: [text](url) or [text](url "optional title")
	for (const [, href] of rawContent.matchAll(/\[[^\]]*\]\(([^)"'\s][^)]*)\)/g)) {
		// Strip an optional inline title after the URL: url "title"
		links.add(href.split(/\s+"/)[0].trim());
	}

	// HTML / Liquid href attributes (single- or double-quoted values)
	for (const [, href] of rawContent.matchAll(/href=['"]([^'"]+)['"]/g)) {
		links.add(href);
	}

	return links;
}

/**
 * Resolve a bare link (fragment and query-string already stripped) to a
 * canonical output URL. Returns null for external, non-page, or
 * unresolvable links.
 *
 * @param {string} bare          - link with #fragment and ?query removed
 * @param {string} sourceUrl     - output URL of the linking page, e.g. "/foo/"
 * @param {string} sourceDir     - absolute FS directory of the source file
 * @param {string} siteHostname  - e.g. "tommi.space"
 * @param {Map<string,string>} fsPathToUrl  - resolved FS path → output URL
 * @returns {string|null}
 */
function resolveLink(bare, sourceUrl, sourceDir, siteHostname, fsPathToUrl) {
	// Skip Liquid / Nunjucks template expressions like {{ variable }}
	if (/[{}]/.test(bare)) return null;

	// ── Absolute URL ─────────────────────────────────────────────────────────
	if (/^https?:\/\//i.test(bare) || bare.startsWith('//')) {
		try {
			const u = new URL(bare.startsWith('//') ? `https:${bare}` : bare);
			if (!siteHostname || u.hostname !== siteHostname) return null;
			return canonicalPath(u.pathname);
		} catch {
			return null;
		}
	}

	// ── File-path link (extension identifies a template source file) ─────────
	// e.g. "[foo](../bar.md)" — resolved by InputPathToUrlTransformPlugin
	const ext = path.extname(bare).toLowerCase();
	if (ext === '.md' || ext === '.html' || ext === '.liquid' || ext === '.njk') {
		const abs = path.resolve(sourceDir, decodeURIComponent(bare));
		return fsPathToUrl.get(abs) ?? null;
	}

	// Ignore other extension-bearing links (images, PDFs, CSS, …)
	if (ext) return null;

	// ── Root-relative or relative URL path ───────────────────────────────────
	const abs = bare.startsWith('/')
		? bare
		: path.posix.resolve(
			sourceUrl.endsWith('/') ? sourceUrl : `${sourceUrl}/`,
			bare,
		);
	return canonicalPath(abs);
}

/**
 * Normalise a URL path by adding a trailing slash to bare directory-style
 * paths (those that carry no file extension).
 *
 * @param {string} p
 * @returns {string|null}
 */
function canonicalPath(p) {
	if (!p) return null;
	if (!path.extname(p) && !p.endsWith('/')) return `${p}/`;
	return p;
}

// ── Plugin ───────────────────────────────────────────────────────────────────

/**
 * Eleventy plugin — backlinks
 *
 * Adds a `backlinks` array to every template's data cascade.
 * Each entry is `{ url: string, title: string }` and represents a page in
 * the site that contains a link pointing to the current page.
 *
 * Usage in a layout or template (Liquid example):
 *
 *   {% if backlinks.size > 0 %}
 *     <nav aria-label="Backlinks">
 *       <ul>
 *         {% for bl in backlinks %}
 *           <li><a href="{{ bl.url }}">{{ bl.title }}</a></li>
 *         {% endfor %}
 *       </ul>
 *     </nav>
 *   {% endif %}
 *
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 * @param {{ siteUrl?: string }} [options]
 *   - `siteUrl`: base URL used to recognise absolute self-links
 *     (e.g. "https://example.com"). Falls back to `site.url` from global
 *     data, then to an empty string (absolute links are then ignored).
 */
export default function pluginBacklinks(eleventyConfig, options = {}) {
	/**
	 * Reverse-link index: output URL → pages that link to it.
	 * Populated once per build inside `eleventyComputed.backlinks` below.
	 *
	 * @type {Record<string, Array<{url: string, title: string}>>}
	 */
	const backlinksMap = Object.create(null);

	/** Guards against rebuilding the map more than once per build. */
	let mapBuilt = false;

	// Reset state before every build so watch-mode rebuilds stay accurate.
	eleventyConfig.on('eleventy.before', () => {
		for (const key of Object.keys(backlinksMap)) delete backlinksMap[key];
		mapBuilt = false;
	});

	/**
	 * Scan all pages and populate `backlinksMap`.
	 * Called once per build with the fully-populated `collections.all` array.
	 *
	 * @param {object[]} all - items from collections.all
	 * @param {string}   siteUrl
	 */
	function buildMap(all, siteUrl) {
		let siteHostname = '';
		try { siteHostname = new URL(siteUrl).hostname; } catch { /* ignore */ }

		// Build a resolved-FS-path → output-URL lookup for file-path links
		// (e.g. "[foo](../bar.md)" used alongside InputPathToUrlTransformPlugin).
		const fsPathToUrl = new Map(
			all
				.filter((p) => p.inputPath && p.url)
				.map((p) => [path.resolve(p.inputPath), p.url]),
		);

		for (const page of all) {
			if (!page.rawInput || !page.url) continue;

			const sourceUrl = page.url;
			const sourceDir = path.dirname(path.resolve(page.inputPath));

			for (const rawLink of extractRawLinks(page.rawInput)) {
				// Strip fragment (#id) and query string; skip pure-fragment links.
				const bare = rawLink.split('#')[0].split('?')[0];
				if (!bare) continue;

				const targetUrl = resolveLink(bare, sourceUrl, sourceDir, siteHostname, fsPathToUrl);

				// Skip unresolvable links and self-links.
				if (!targetUrl || targetUrl === sourceUrl) continue;

				if (!backlinksMap[targetUrl]) backlinksMap[targetUrl] = [];

				// Record each linking page at most once per target.
				if (!backlinksMap[targetUrl].some((b) => b.url === sourceUrl)) {
					backlinksMap[targetUrl].push({
						url: sourceUrl,
						title: page.data.title ?? page.fileSlug ?? sourceUrl,
					});
				}
			}
		}

		mapBuilt = true;
	}

	// ── Expose `backlinks` to every template via Computed Data ────────────────

	eleventyConfig.addGlobalData('eleventyComputed', {
		/**
		 * Returns all pages that link to the current template.
		 *
		 * Accessing `data.collections.all` causes Eleventy's dependency-tracking
		 * proxy to defer this function to the second computed-data pass, which
		 * runs AFTER all collections have been populated.  At that point
		 * `collections.all` is complete and we can scan every page's `rawInput`
		 * to build the reverse-link index exactly once per build.
		 *
		 * @param {object} data - full data cascade for the current template
		 * @returns {Array<{url: string, title: string}>}
		 */
		backlinks(data) {
			const all = data.collections?.all;

			// Build the index on the first call of the second pass.
			// `all` is [] during Eleventy's proxy-analysis pass, so we skip that.
			if (!mapBuilt && Array.isArray(all) && all.length > 0) {
				const siteUrl = options.siteUrl ?? all[0]?.data?.site?.url ?? '';
				buildMap(all, siteUrl);
			}

			const url = data.page?.url;
			return url ? (backlinksMap[url] ?? []) : [];
		},
	});
}
