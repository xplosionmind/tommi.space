function tocBehavior() {
	let toc = document.getElementById('toc');
	if (toc) {
		let footer = document.getElementsByTagName('footer')[0];
		let footerHeight = footer.offsetHeight;
		let tocHeight = pageHeight - footerHeight - 900; // adding some random pixels to consider margins etc.
		if (document.body.scrollTop > tocHeight || document.documentElement.scrollTop > tocHeight) {
			document.getElementById('toc').style.left = '-19vw';
		} else {
			document.getElementById('toc').style.left = '4vw';
		}
	}
}