const { EleventyRenderPlugin } = require('@11ty/eleventy');

// Markdown //
function wikilinkSlugifier(pageName) {
	pageName = pageName.replace(/\s+/, '-');
	pageName = slugify(pageName, {
		remove: /'/g,
		lower: true
	});
	return pageName
};

const markdownIt = require('markdown-it');
const md = markdownIt({
		html: true,
		typographer: true
	})
	.use(require('markdown-it-wikilinks')({
		uriSuffix: '',
		makeAllLinksAbsolute: true,
		class: 'wikilink',
		postProcessPageName: wikilinkSlugifier,
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

	eleventyConfig.addPassthroughCopy({'svg': '/'});
	eleventyConfig.addPassthroughCopy({'assets': '/'});
	eleventyConfig.addPassthroughCopy('index.js');

	// Plugins //
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	/*eleventyConfig.addPlugin(require('@aloskutov/eleventy-plugin-external-links'), {
		url: 'https://tommi.space',
		rel: ['noreferrer', 'noopener', 'external'],
		overwrite: false,
		excludedDomains:[
			'https://tommasomarmo.com'
		]
	});*/
	eleventyConfig.addPlugin(require('eleventy-plugin-embed-everything'), {
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
	eleventyConfig.addPlugin(require('./eleventy.config.images.js'));
	/*eleventyConfig.addPlugin(
		require('@photogabble/eleventy-plugin-interlinker'),
		{
			defaultLayout: 'layouts/wikilink-embed.liquid'
		}
	);*/
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
	eleventyConfig.addPlugin(require('eleventy-plugin-toc'), {
		ul: true
	});
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

	// Production-only //
	if (process.env.ELEVENTY_ENV == 'production') {
		// Minify output //
		eleventyConfig.addTransform(require('html-minifier-terser'), function(content, outputPath) {
			if( this.outputPath && this.outputPath.endsWith('.html') ) {
				let minified = require('html-minifier-terser').minify(content, {
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
		//temporarily disabled since it removes Piwigo styling
		//eleventyConfig.addPlugin(require('eleventy-plugin-purgecss'));
	}

	eleventyConfig.on('eleventy.after', () => {
		const execSync = require('child_process').execSync;
		execSync(`bun x pagefind`, { encoding: 'utf-8' });
	})

	return {
		dir: {
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
			output: 'www'
		}
	}; // there should never be anything after the “return” function
};
