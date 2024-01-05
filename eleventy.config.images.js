const eleventyImage = require('@11ty/eleventy-img');
const path = require('path');

module.exports = eleventyConfig => {
	eleventyConfig.addAsyncShortcode('img', async function imageShortcode(src, alt, imgClass, widths, sizes) {
		let formats = ['webp'];
		let assetPath = 'assets/' + src;
		if (src.startsWith('https://')) {
			assetPath = src;
		} //else if (src.startsWith('/')) {
			//assetPath = 'assets' + src.slice(1);
		//}
		let metadata = await eleventyImage(assetPath, {
			imgClass: imgClass || 'test',
			widths: widths || ['auto'],
			formats,
			//urlPath: '/',
			outputDir: './www/img/',
		});

		let imageAttributes = {
			alt,
			sizes,
			//class: imgClass,
			loading: 'lazy',
			decoding: 'async',
		};
		return eleventyImage.generateHTML(metadata, imageAttributes);
	});
};
