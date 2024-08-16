import { EleventyRenderPlugin } from '@11ty/eleventy';

// Markdown //
function wikilinkSlugifier(pageName) {
	pageName = pageName.replace(/\s+/, '-');
	pageName = slugify(pageName, {
		remove: /'/g,
		lower: true
	});
	return pageName
};

import markdownIt from 'markdown-it';

//import markdownItWikilinks from 'markdown-it-wikilinks';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItMark from 'markdown-it-mark';
import markdownItTaskLists from 'markdown-it-task-lists';

const md = markdownIt({
		html: true,
		linkify: true,
		typographer: true
	})
	/*.use(markdownItWikilinks, {
		uriSuffix: '',
		makeAllLinksAbsolute: true,
		postProcessPageName: wikilinkSlugifier
	})*/
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink()
	})
	.use(markdownItFootnote)
	.use(markdownItMark)
	.use(markdownItTaskLists);

import slugify from 'slugify';

import { parse } from 'csv-parse/sync';

import pluginEmbed from 'eleventy-plugin-embed-everything';
import pluginSass from 'eleventy-sass';
import pluginToc from 'eleventy-plugin-toc';
import pluginSitemap from '@quasibit/eleventy-plugin-sitemap';
//import pluginImg from '@11ty/eleventy-img';

import htmlMinifier from 'html-minifier-terser';

import childProcess from 'child_process';

import eleventyUpgradeHelp from '@11ty/eleventy-upgrade-help';

export default async function(eleventyConfig) {
	// General //
	eleventyConfig.setLibrary('md', md);
	eleventyConfig.addDataExtension('csv', contents => parse(contents, {columns: true, skip_empty_lines: true}));

	eleventyConfig.addGlobalData('permalink', () => {
		return (data) => slugify(`${data.page.fileSlug}`, {
			remove: /'/g,
			lower: true
		}).concat('/');
	});

	// Collections //
	eleventyConfig.addCollection('now', function(collection) {
		return collection.getFilteredByGlob('now/**/*').sort((a, b) => {
			return b.date - a.date; // sort by date - descending
		});
	});
	eleventyConfig.addCollection('zibaldone', function(collection) {
		return collection.getFilteredByGlob('content/zibaldone/**/*').sort((a, b) => {
			return b.date - a.date; // sort by date - descending
		});
	});
	eleventyConfig.addCollection('jam', function(collection) {
		return collection.getFilteredByGlob('content/jam/public/*').sort((a, b) => {
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
	eleventyConfig.addCollection('filinge', function(collection) {
		return collection.getFilteredByGlob('content/filinge/*').sort((a, b) => {
			return b.date - a.date;
		});
	});
	eleventyConfig.addCollection('italian', function (collectionApi) {
		return collectionApi.getAll().filter((item) => item.data.lang == 'it').sort((a, b) => {
			return b.date - a.date;
		});
	});
	// Multilingual sitemap collection. See https://github.com/quasibit/eleventy-plugin-sitemap#create-a-multilingual-sitemap
	/*eleventyConfig.addCollection('sitemap', function(collectionApi) {
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
	});*/

	eleventyConfig.addPassthroughCopy({'svg': '/'});
	eleventyConfig.addPassthroughCopy({'assets': '/'});

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
	//eleventyConfig.addPlugin(pluginImg);
	eleventyConfig.addPlugin(pluginSass, {
		compileOptions: {
			permalink: function(contents, inputPath) {
				return (data) => data.page.filePathStem.replace(/^\/styles\//, '/') + '.css';
			}
		},
		sass: {
			style: 'compressed'
		}
	});
	eleventyConfig.addPlugin(pluginToc, {
		ul: true
	});
	eleventyConfig.addPlugin(pluginSitemap, {
		sitemap: {
			hostname: 'https://tommi.space'
		},
		lastModifiedProperty: 'updated'
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
		eleventyConfig.addTransform(htmlMinifier, function(content, outputPath) {
			if( this.outputPath && this.outputPath.endsWith('.html') ) {
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
	}

	eleventyConfig.on('eleventy.after', () => {
		childProcess.execSync(`bun x pagefind`, { encoding: 'utf-8' });
	})

	eleventyConfig.addPlugin(eleventyUpgradeHelp);

	return {
		dir: {
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
			output: 'www'
		}
	}; // there should never be anything after the “return” function
};

