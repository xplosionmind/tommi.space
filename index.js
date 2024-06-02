const bodyEl = document.body;
const scrollBtn = document.getElementById('scrollBtn');

function changeBackground() {
	if (backgroundStatus == 'wip') {
		bodyEl.style.background = 'var(--background)';
	} else {
		bodyEl.style.background = 'unset';
	}
}

function scrollBtnBehavior() {
	if (document.body.scrollTop > 1300 || document.documentElement.scrollTop > 1300) {
		scrollBtn.title='scroll to top';
		scrollBtn.setAttribute('aria-label', 'scroll to top');
		scrollBtn.innerHTML = '🔝';
	} else {
		scrollBtn.title='scroll to bottom';
		scrollBtn.setAttribute('aria-label', 'scroll to bottom');
		scrollBtn.innerHTML = '⬇️';
	};
}

function nowScroll() {
	if (document.body.scrollTop > 1300 || document.documentElement.scrollTop > 1300) {
		window.scrollTo(0, 0);
	} else {
		window.scrollTo(0, document.body.scrollHeight);
	}
}

window.addEventListener('load', () => {	
	scrollBtn.addEventListener('click', nowScroll);
	scrollBtnBehavior();
	window.onscroll = function() {
		scrollBtnBehavior();
	};
});
