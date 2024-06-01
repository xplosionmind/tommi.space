module.exports = {
	lang: 'en',
	layout: 'wrapper.liquid',
	header: true,
	toolbar: true,
	footer: true,
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

