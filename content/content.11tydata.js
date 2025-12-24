export default {
	lang: 'en',
	layout: 'wrapper.vto',
	header: true,
	toolbar: true,
	footer: true,
	eleventyComputed: {
		title(data) {
			return data.title || data.page?.fileSlug
		}
	}
}
