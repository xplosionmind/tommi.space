const scrollButton = document.getElementById('scrollButton');

function scrollButtonBehavior() {
	scrollButton.href = 'javascript:void(0);';
	if (document.body.scrollTop < 1000 || document.documentElement.scrollTop < 1000) {
		scrollButton.title='scroll to bottom';
		scrollButton.setAttribute('aria-label', 'scroll to bottom');
		scrollButton.classList.add('scrollToBottom');
	} else {
		scrollButton.title='scroll to top';
		scrollButton.setAttribute('aria-label', 'scroll to top');
		scrollButton.classList.remove('scrollToBottom');
	};
}

function nowScroll() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		window.scrollTo(0, 0);
	} else {
		window.scrollTo(0, pageHeight);
	}
}