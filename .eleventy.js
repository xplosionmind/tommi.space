const fs = require('fs');
const miniHtml = require('html-minifier');
const _ = require('lodash');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const simpleGit = require('simple-git');

// Markdown //
function wikilinkSlugifier(pageName) {
	pageName = pageName.trim()
	pageName = pageName.split('/').map(require('sanitize-filename')).join('/')
	pageName = pageName.replace(/\s+/, '-')
	return pageName
}
const markdownIt = require('markdown-it');
const md = markdownIt({
	html: true,
	fence: false
})
.use(require('markdown-it-wikilinks')({
	uriSuffix: '',
	makeAllLinksAbsolute: true,
	class: 'wikilink',
	postProcessPageName: wikilinkSlugifier
})).disable('code')
.use(require('markdown-it-attrs'))
.use(require('markdown-it-anchor'))
.use(require('markdown-it-footnote'))
.use(require('markdown-it-sup'))
.use(require('markdown-it-sub'))
.use(require('markdown-it-ins'))
.use(require('markdown-it-mark'))
.use(require('markdown-it-task-lists'))
.use(require('markdown-it-container'), 'box')
.use(require('markdown-it-collapsible'))
.use(require('markdown-it-abbr'))
.use(require('markdown-it-mathjax3'));

module.exports = function(eleventyConfig) {
	// General //
	eleventyConfig.setLibrary('md', md);
	eleventyConfig.setFrontMatterParsingOptions({
		permalink: '/{{ page.fileSlug }}/',
	});
	eleventyConfig.addDataExtension('csv', contents => require('csv-parse/sync').parse(contents, {columns: true, skip_empty_lines: true}));
	eleventyConfig.setFrontMatterParsingOptions({ excerpt: true, excerpt_separator: '<!--excerpt-->'});
	eleventyConfig.setQuietMode(true);

	// Collections //
	eleventyConfig.addCollection('posts', function(collection) {
		return collection.getFilteredByGlob('content/posts/*').sort((a, b) => {
			return b.date - a.date; // sort by date - descending
		});
	});
	eleventyConfig.addCollection('jam', function(collection) {
		return collection.getFilteredByGlob('content/notes/public/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('poetry', function(collection) {
		return collection.getFilteredByGlob('content/poetry/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('sconnesso', function(collection) {
		return collection.getFilteredByGlob('content/sconnesso/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	// Multilingual sitemap collection. See https://github.com/quasibit/eleventy-plugin-sitemap#create-a-multilingual-sitemap
	eleventyConfig.addCollection('sitemap', function(collectionApi) {
		return collectionApi
			.getAll()
			.map((item, index, all) => {
				return {
					url: item.url,
					date: item.date,
					data: {
						...item.data,
						sitemap: {
							...item.data.sitemap,
							links:
								all
									.filter(other => other.data.ref === item.data.ref)
									.map(translation => {
										return {
											url: translation.url,
											lang: translation.data.lang,
										};
									}),
						},
					},
				}
			});
	});


	// Scss //
	eleventyConfig.addWatchTarget('styles');
	eleventyConfig.addPassthroughCopy({'styles': '/'});
	eleventyConfig.addPassthroughCopy({'svg': '/'});
	eleventyConfig.addPassthroughCopy('js');

	// Plugins //
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-directory-output'));
	eleventyConfig.addPlugin(require('eleventy-plugin-find'));
	eleventyConfig.addPlugin(require('@quasibit/eleventy-plugin-schema'));
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	eleventyConfig.addPlugin(require('@sardine/eleventy-plugin-external-links'));
	eleventyConfig.addPlugin(require('eleventy-plugin-embed-everything'), {
		youtube: {
			options: {
				embedClass: 'embed',
				lite: {
					css: {
						enabled: false
					}
				}
			}
		},
		spotify: {
			options: {
				embedClass: 'embed'
			}
		},
		instagram: {
			options: {
				embedClass: 'embed'
			}
		}
	});
	eleventyConfig.addPlugin(require('eleventy-plugin-svg-contents'));
	eleventyConfig.addPlugin(require('@sardine/eleventy-plugin-tinysvg'), {
		baseUrl: 'assets/svg/'
	});
	eleventyConfig.addPlugin(require('eleventy-plugin-toc'), {
		ul: true,
	});
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(require('@quasibit/eleventy-plugin-sitemap'), {
		sitemap: {
			hostname: 'https://tommi.space'
		},
	});
	eleventyConfig.addPlugin(require('eleventy-plugin-seo'), {
		title: 'Tommi Space',
		description: 'A virtual representation of the mess inside Tommi’s mind',
		url: 'https://tommi.space',
		author: 'Tommi',
		image: '/tommi.space.wip.png',
		options: {
			titleStyle: 'minimalistic',
			titleDivider: '|',
			imageWithBaseUrl: true,
			twitterCardType: 'summary_large_image',
			showPageNumbers: false
		}
	});

	// Filters //
	eleventyConfig.addFilter('reverse', (collection) => {
		const arr = [...collection];
		return arr.reverse();
	});
	eleventyConfig.addFilter('markdownify', (str) => {
		return md.renderInline(str);
	});
	// RSS Filters //
	eleventyConfig.addFilter('dateToRfc3339', pluginRss.dateToRfc3339);
	eleventyConfig.addFilter('getNewestCollectionItemDate', pluginRss.getNewestCollectionItemDate);
	eleventyConfig.addFilter('absoluteUrl', pluginRss.absoluteUrl);
	eleventyConfig.addFilter('convertHtmlToAbsoluteUrls', pluginRss.convertHtmlToAbsoluteUrls);

	// Changelog configuration //
	/* see https://github.com/11ty/eleventy/discussions/2324 */
	const git = simpleGit();
	eleventyConfig.addFilter(
		'git_commit_msg',
		async function (file = this.page.inputPath) {
		const { latest } = await git.log({ file, maxCount: 1 });
		return latest.message;
		}
	);
	eleventyConfig.addShortcode(
		'git_commit_msg',
		async function (file = this.page.inputPath) {
    		const { latest } = await git.log({ file, maxCount: 1 });
    		// Make sure the file was found in git history (ie, not a newly created file which hasn't been committed yet.
    		if (!latest) {
    			return `<!-- git commit history not found for "${file}" -->`;
    		}
    		return `<span data-file='${file}' data-hash='${latest.hash}' data-date='${latest.date}'>${latest.message}</span>`;
		}
	);

	 // Minify output //
	eleventyConfig.addTransform('miniHtml', function(content, outputPath) {
		if( this.outputPath && this.outputPath.endsWith('.html') ) {
			let minified = miniHtml.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true
			});
			return minified;
		}
		return content;
	});

	// 404 //
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function(err, bs) {
				bs.addMiddleware('*', (req, res) => {
					const content_404 = fs.readFileSync('www/404.html');
					res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
					res.write(content_404);
					res.end();
				});
			}
		}
	});

	return {
		dir: {
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
			output: 'www'
		}
	}; // there should never be anything after the “return” function
};
