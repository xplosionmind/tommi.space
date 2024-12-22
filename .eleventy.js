import { EleventyRenderPlugin, InputPathToUrlTransformPlugin, IdAttributePlugin } from '@11ty/eleventy';
import htmlMinifier from 'html-minifier-terser';
import slugify from '@sindresorhus/slugify';

import markdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItMark from 'markdown-it-mark';
import markdownItTaskLists from 'markdown-it-task-lists';

import yaml from 'js-yaml';
import { parse as csvParse } from 'csv-parse/sync';

import pluginEmbed from 'eleventy-plugin-embed-everything';
import pluginToc from 'eleventy-plugin-toc';
//import pluginImg from '@11ty/eleventy-img';


export default function (eleventyConfig) {

	eleventyConfig.addGlobalData('permalink', () => {
		return (data) => slugify(data.page.fileSlug).concat('/');
	});

	// Markdown //
	const md = markdownIt({
		html: true,
		linkify: true,
		typographer: true
	}).use(markdownItFootnote).use(markdownItMark).use(markdownItTaskLists);
	//eleventyConfig.setLibrary('md', md);

	// Data files //
	eleventyConfig.addDataExtension('yaml,yml', contents => yaml.load(contents));
	eleventyConfig.addDataExtension('csv', contents => csvParse(contents, {
		columns: true,
		skip_empty_lines: true
	}));

	// Collections //
	eleventyConfig.addCollection('now', function (collection) {
		return collection.getFilteredByGlob('now/**/*').sort((a, b) => {
			return b.date - a.date; // sort by date - descending
		});
	});
	eleventyConfig.addCollection('zibaldone', function (collection) {
		return collection.getFilteredByGlob('content/zibaldone/**/*').sort((a, b) => {
			return b.date - a.date; // sort by date - descending
		});
	});
	eleventyConfig.addCollection('jam', function (collection) {
		return collection.getFilteredByGlob('content/jam/public/*').sort((a, b) => {
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
	eleventyConfig.addCollection('filinge', function (collection) {
		return collection.getFilteredByGlob('content/filinge/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('italian', function (collectionApi) {
		return collectionApi.getAll().filter((item) => item.data.lang == 'it').sort((a, b) => {
			return b.date - a.date;
		});
	});

	eleventyConfig.addPassthroughCopy({ 'assets': '/' });

	// Plugins //
	eleventyConfig.addPlugin(pluginEmbed, {
		youtube: {
			options: {
				embedClass: 'auto-embed',
				lite: {
					css: {
						enabled: false
					}
				}
			}
		},
		spotify: {
			options: {
				embedClass: 'auto-embed',
				width: '100%'
			}
		},
		instagram: {
			options: {
				embedClass: 'auto-embed'
			}
		}
	});
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin, {
		extensions: 'md,html,liquid'
	});
	eleventyConfig.addPlugin(IdAttributePlugin);
	/*eleventyConfig.addPlugin(pluginImg, {
		extensions: 'html',
		formats: ['webp'],
		widths: ['auto'],
		defaultAttributes: {
			loading: 'lazy',
			decoding: 'async',
			sizes: 'auto'
		}
	});*/
	eleventyConfig.addPlugin(pluginToc, {
		ul: true
	});

	// Filters //
	eleventyConfig.addFilter('reverse', (collection) => {
		const arr = [...collection];
		return arr.reverse();
	});
	eleventyConfig.addFilter('markdownify', (str) => {
		return md.renderInline(str);
	});

	// Production-only //
	if (process.env.ELEVENTY_ENV == 'production') {
		// Minify output //
		eleventyConfig.addTransform(htmlMinifier, async (content, outputPath) => {
			if (this.outputPath && this.outputPath.endsWith('.html')) {
				const minified = htmlMinifier.minify(content, {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyJS: true,
					noNewlinesBeforeTagClose: true,
					quoteCharacter: "'",
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeEmptyElements: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					sortAttributes: true,
					sortClassName: true,
					useShortDoctype: true,
				});
				return minified;
			}
			return content;
		});
	}

	return {
		dir: {
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
			output: 'www'
		}
	};
};
