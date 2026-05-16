import { InputPathToUrlTransformPlugin, EleventyRenderPlugin, IdAttributePlugin } from 'npm:@11ty/eleventy';
import syntaxHighlight from 'npm:@11ty/eleventy-plugin-syntaxhighlight';
import htmlMinifier from 'npm:html-minifier-next';
import process from 'node:process';
import { execSync } from 'node:child_process';

import markdownIt from 'npm:markdown-it';
import markdownItAnchor from 'npm:markdown-it-anchor';
import markdownItFootnote from 'npm:markdown-it-footnote';
import markdownItMark from 'npm:markdown-it-mark';

import yaml from 'npm:js-yaml';
import { parse as csvParse } from 'csv-parse/sync';

import pluginEmbed from 'npm:eleventy-plugin-embed-everything';
import pluginToc from 'npm:@uncenter/eleventy-plugin-toc';
import { eleventyImageTransformPlugin } from 'npm:@11ty/eleventy-img';
import pluginRobotsTxt from 'npm:eleventy-plugin-robotstxt';
import validateHtml from 'npm:@saiballo/eleventy-plugin-validate-html'

import pluginMarkdownEmbed from './pluginMarkdownEmbed.js';

export default function (eleventyConfig) {

	eleventyConfig.addPassthroughCopy({ 'assets': '/' });
	eleventyConfig.addPassthroughCopy({ 'js': '/' });
	eleventyConfig.addWatchTarget('js/')
	eleventyConfig.addWatchTarget('styles/')
	eleventyConfig.addGlobalData('permalink', () => {
		return (data) => eleventyConfig.getFilter('slugify')(data.page.fileSlug).concat('/');
	});

	// Parse Curriculum vitae output PDF //
	eleventyConfig.addPassthroughCopy({ 'cv/cv.pdf': '/Tommaso Marmo – Curriculum vitae.pdf' });
	eleventyConfig.addPassthroughCopy({ 'cv/cv.it.pdf': '/it/Tommaso Marmo – Curriculum vitae.pdf' });

	// Markdown //
	const md = markdownIt({
		html: true,
		linkify: true,
		typographer: true
	}).use(markdownItFootnote)
		.use(markdownItMark)
		.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.headerLink(),
			slugify: (s) => encodeURIComponent(String(s))
		});
	eleventyConfig.setLibrary('md', md);

	// Data files //
	eleventyConfig.addDataExtension('yaml,yml', contents => yaml.load(contents));
	eleventyConfig.addDataExtension('csv', contents => csvParse(contents, {
		columns: true,
		skip_empty_lines: true
	}));

	// Collections //
	eleventyConfig.addCollection('filinge', function (collection) {
		return collection.getFilteredByGlob('content/filinge/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('italian', function (collectionApi) {
		return collectionApi.getFilteredByGlob('content/**/*').filter((item) => item.data.lang == 'it').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('jam', function (collection) {
		return collection.getFilteredByGlob('content/jam/public/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('lastUpdated', function (collectionApi) {
		return collectionApi.getAll().sort((a, b) => {
			const aUpdated = a.data.updated || a.date || 0;
			const bUpdated = b.data.updated || b.date || 0;
			// #BUG: Sorting is not accurate, and sort order changes every build?
			// https://github.com/xplosionmind/tommi.space/issues/130
			return bUpdated - aUpdated;
		});
	});
	eleventyConfig.addCollection('now', function (collection) {
		return collection.getFilteredByGlob('now/**/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('poetry', function (collection) {
		return collection.getFilteredByGlob('content/poetry/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('sconnesso', function (collection) {
		return collection.getFilteredByGlob('content/sconnesso/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('zibaldone', function (collection) {
		return collection.getFilteredByGlob('content/zibaldone/**/*').sort((a, b) => {
			return b.date - a.date;
		});
	});

	// Plugins //
	eleventyConfig.addPlugin(pluginEmbed, {
		add: ['mastodon'],
		youtube: {
			options: {
				lite: {
					css: {
						enabled: false
					}
				}
			}
		},
		mastodon: {
			options: {
				server: 'pan.rent'
			}
		},
	});
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(IdAttributePlugin, {
		slugify: (str) => encodeURIComponent(str),
		checkDuplicates: false
	});
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin, {
		extensions: 'md,html,liquid'
	});
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		extensions: 'html',
		formats: ['webp', 'auto'],
		widths: [320, 720, 1080, 'auto'],
		defaultAttributes: {
			loading: 'lazy',
			decoding: 'async',
			sizes: 'auto'
		},
		outputDir: './www/img/'
	});
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(pluginToc, {
		ul: true
	});
	eleventyConfig.addPlugin(pluginMarkdownEmbed, { md });

	// Filters //
	eleventyConfig.addFilter('reverse', (collection) => {
		const arr = [...collection];
		return arr.reverse();
	});
	eleventyConfig.addFilter('markdownify', (str) => {
		return md.renderInline(str);
	});
	eleventyConfig.addFilter('obfuscateEmail', (email) => {
		return email.split('').map(function (char) {
			return `&#${char.charCodeAt(0)};`;
		}).join('');
	});

	// Production-only //
	if (process.env.ELEVENTY_ENV != 'development') {
		// Validate HTML //
		eleventyConfig.addPlugin(validateHtml, {
			'ignore': [
				'Unknown element <lite-youtube>',
				'Unknown element <pagefind-searchbox>',
				'Duplicate ID',
				'Raw ">" must be encoded as "&gt;"'
			]
		});
		// Minify output //
		eleventyConfig.addTransform(htmlMinifier, async function (content) {
			if ((this.page.outputPath || '').endsWith('.html')) {
				const minified = await htmlMinifier.minify(content, {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyJS: true,
					noNewlinesBeforeTagClose: true,
					quoteCharacter: "'",
					//removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					//removeEmptyElements: true,
					//removeOptionalTags: true,
					removeRedundantAttributes: true,
					sortAttributes: true,
					useShortDoctype: true,
				});
				return minified;
			}
			return content;
		});
		// Fetch and parse robots.txt //
		eleventyConfig.addPlugin(pluginRobotsTxt, {
			shouldBlockAIRobots: true
		});
	}

	if (process.env.CSS_NAKED) {
		eleventyConfig.addGlobalData('cssNaked', true);
	};

	eleventyConfig.on('eleventy.after', () => {
		// Search indexing
		execSync(`dx npm:pagefind`, { encoding: 'utf-8' });
	});

	return {
		dir: {
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
			output: 'www'
		}
	};
};
