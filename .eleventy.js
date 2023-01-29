const fs = require('fs');
const _ = require('lodash');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const miniHtml = require('html-minifier');
const { EleventyRenderPlugin } = require('@11ty/eleventy');

// Markdown //
function wikilinkSlugifier(pageName) {
	pageName = pageName.replace(/\s+/, '-');
	pageName = slugify(pageName, {
		remove: /'/g,
		lower: true
	});
	return pageName
}
const markdownIt = require('markdown-it');
const { default: slugify } = require('slugify');
const md = markdownIt({
	html: true
})
.use(require('markdown-it-wikilinks')({
	uriSuffix: '',
	makeAllLinksAbsolute: true,
	class: 'wikilink',
	postProcessPageName: wikilinkSlugifier
}))
.use(require('markdown-it-anchor'))
.use(require('markdown-it-footnote'))
.use(require('markdown-it-mark'))
.use(require('markdown-it-task-lists'))
.use(require('markdown-it-mathjax3'));

module.exports = function(eleventyConfig) {
	// General //
	eleventyConfig.setLibrary('md', md);
	eleventyConfig.addDataExtension('csv', contents => require('csv-parse/sync').parse(contents, {columns: true, skip_empty_lines: true}));

	eleventyConfig.addGlobalData('permalink', () => {
		return (data) => slugify(`${data.page.fileSlug}`, {
			remove: /'/g,
			lower: true
		}).concat('/');
	});

	// Collections //
	eleventyConfig.addCollection('posts', function(collection) {
		return collection.getFilteredByGlob('content/posts/**/*').sort((a, b) => {
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

	eleventyConfig.setServerPassthroughCopyBehavior('copy');
	eleventyConfig.addPassthroughCopy({'svg': '/'});
	eleventyConfig.addPassthroughCopy('js');
	eleventyConfig.addPassthroughCopy({'assets': '/'});

	// Plugins //
	eleventyConfig.addPlugin(require('eleventy-plugin-find'));
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	eleventyConfig.addPlugin(require('@aloskutov/eleventy-plugin-external-links'), {
		url: 'https://tommi.space',
		rel: ['noreferrer', 'noopener', 'external'],
		overwrite: false,
		excludedDomains:[
			'https://tommasomarmo.com'
		]
	});
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
				embedClass: 'embed',
				width: '100%'
			}
		},
		instagram: {
			options: {
				embedClass: 'embed'
			}
		}
	});
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(require('eleventy-sass'), {
		compileOptions: {
			permalink: function(contents, inputPath) {
				return (data) => data.page.filePathStem.replace(/^\/styles\//, '/') + '.css';
			}
		},
		sass: {
			style: 'compressed'
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
	// RSS Filters //
	eleventyConfig.addFilter('dateToRfc3339', pluginRss.dateToRfc3339);
	eleventyConfig.addFilter('getNewestCollectionItemDate', pluginRss.getNewestCollectionItemDate);
	eleventyConfig.addFilter('absoluteUrl', pluginRss.absoluteUrl);
	eleventyConfig.addFilter('convertHtmlToAbsoluteUrls', pluginRss.convertHtmlToAbsoluteUrls);

	// Production-only //
	if (process.env.ELEVENTY_ENV == 'production') {
		// Minify output //
		eleventyConfig.addTransform(require('html-minifier'), function(content, outputPath) {
			if( this.outputPath && this.outputPath.endsWith('.html') ) {
				let minified = miniHtml.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: {
						warnings: true,
						expression: true,
					},
					minifyURLs: true
				});
				return minified;
			}
			return content;
		});
		eleventyConfig.addPlugin(require('eleventy-plugin-purgecss'));
	}

	return {
		dir: {
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
			output: 'www'
		}
	}; // there should never be anything after the “return” function
};