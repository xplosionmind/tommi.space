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
const md = markdownIt({
		html: true,
		typographer: true
	})
	.use(require('markdown-it-wikilinks')({
		uriSuffix: '',
		makeAllLinksAbsolute: true,
		class: 'wikilink',
		postProcessPageName: wikilinkSlugifier
	}))
	.use(require('markdown-it-anchor'), {
		permalink: require('markdown-it-anchor').permalink.headerLink(),
	})
	.use(require('markdown-it-footnote'))
	.use(require('markdown-it-mark'))
	.use(require('markdown-it-task-lists'))
	.use(require('markdown-it-mathjax3'));

const { default: slugify } = require('slugify');

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
	eleventyConfig.addCollection('scripts', function(collection) {
		return collection.getFilteredByGlob('scripts/*.md').sort((a, b) => {
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

	/*eleventyConfig.addTemplateFormats('js');
	eleventyConfig.addExtension('js', {
		outputFileExtension: 'js',
		compile: async (inputContent, inputPath) => {
			console.log(inputPath);
			if (inputPath !== './js/index.js') {
				console.log('path to be skipped');
				return;
			}

			let output = await require('esbuild').build({
				target: 'es2020',
				entryPoints: [inputPath],
				minify: true,
				bundle: true,
				write: false,
			});


			return async () => {
				console.log('processing js');
				console.log(output.outputFiles[0].text);
				return output.outputFiles[0].text;
			}
		}
	});*/

	//eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
	eleventyConfig.addPassthroughCopy({'svg': '/'});
	eleventyConfig.addPassthroughCopy({'assets': '/'});
	eleventyConfig.addPassthroughCopy('index.js');

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
		baseUrl: 'svg/'
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
					minifyJS: true,
					minifyURLs: true
				});
				return minified;
			}
			return content;
		});
		eleventyConfig.addTransform(require('uglify-js'), function(content, outputPath) {
			console.log(outputPath);
			if(this.outputPath && this.outputPath.endsWith('.js') ) {
				return UglifyJS.minify(content);
			}
			return content;
		})
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