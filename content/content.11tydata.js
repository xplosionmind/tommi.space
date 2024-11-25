export default {
	lang: 'en',
	layout: 'wrapper.liquid',
	header: true,
	toolbar: true,
	footer: true,
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
