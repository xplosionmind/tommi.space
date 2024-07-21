module.exports = {
	lang: 'en',
	layout: 'page.liquid',
	eleventyComputed: {
		title(data) {
			return data.title || data.page?.fileSlug
		},
		sitemap: {
			img: data => {
				return { url: data.image };
			}
		}
	}
};

