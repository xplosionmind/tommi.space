module.exports = {
	lang: 'en',
	layout: 'wrapper.liquid',
	image: '/tommi.space.wip.webp',
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
