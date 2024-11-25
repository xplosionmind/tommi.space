import { EleventyRenderPlugin, InputPathToUrlTransformPlugin, IdAttributePlugin } from '@11ty/eleventy';

import markdownIt from 'markdown-it';

import markdownItFootnote from 'markdown-it-footnote';
import markdownItMark from 'markdown-it-mark';
import markdownItTaskLists from 'markdown-it-task-lists';

const md = markdownIt(
	{
		html: true,
		linkify: true,
		typographer: true
	}
).use(markdownItFootnote).use(markdownItMark).use(markdownItTaskLists);

import slugify from '@sindresorhus/slugify';

import yaml from 'js-yaml';
import { parse as csvParse } from 'csv-parse/sync';

//import pluginEmbed from 'eleventy-plugin-embed-everything';
import pluginToc from 'eleventy-plugin-toc';
//import pluginImg from '@11ty/eleventy-img';

import htmlMinifier from 'html-minifier-terser';

//import childProcess from 'child_process';

export default function (eleventyConfig) {
	// General //
	//eleventyConfig.setLibrary('md', md);
	eleventyConfig.addDataExtension('yaml,yml', contents => yaml.load(contents));
	eleventyConfig.addDataExtension('csv', contents => csvParse(contents, {
		columns: true,
		skip_empty_lines: true
	}));

	eleventyConfig.addGlobalData('permalink', () => {
		return (data) => slugify(data.page.fileSlug).concat('/');
	});

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

	eleventyConfig.addPassthroughCopy({ 'svg': '/' });
	eleventyConfig.addPassthroughCopy({ 'assets': '/' });

	// Plugins //
	/*eleventyConfig.addPlugin(pluginEmbed, {
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
	});*/
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin, {
		extensions: 'md,html,liquid'
	});
	eleventyConfig.addPlugin(IdAttributePlugin); // BUG: says that there are duplicate IDs where there aren’t any
	//eleventyConfig.addPlugin(pluginImg);
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
	/*if (process.env.ELEVENTY_ENV == 'production') {
		// Minify output //
		eleventyConfig.addTransform(htmlMinifier, function (content, outputPath) {
			if (this.outputPath && this.outputPath.endsWith('.html')) {
				let minified = htmlMinifier.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyJS: true,
					minifyURLs: true,
					quoteCharacter: "'",
					removeComments: true,
					removeEmptyAttributes: true
				});
				return minified;
			}
			return content;
		});
	}*/

	/*eleventyConfig.on('eleventy.after', () => {
		childProcess.execSync(`bun x pagefind`, { encoding: 'utf-8' });
	})*/

	return {
		dir: {
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
			output: 'www'
		}
	};
};
