const bodyEl = document.body;
const scrollBtn = document.getElementById('scrollBtn');
const homeBtn = document.getElementById('tommiSpace');
const animBtn = document.getElementById('animationToggleBtn');
let animationStatus = localStorage.getItem('animationStatus') || 'running';

function tommiSpaceAnimation() {
	if (animationStatus == 'running' ) {
		homeBtn.style.animationPlayState = 'running';
		animBtn.title='Pause animations';
		animBtn.innerHTML = '⏸️';
	} else {
		homeBtn.style.animationPlayState = 'paused';
		animBtn.title = 'Play animations';
		animBtn.innerHTML = '▶️';
	}
	localStorage.setItem('animationStatus', animationStatus);
}

function changeBackground() {
	if (backgroundStatus == 'wip') {
		bodyEl.style.background = 'var(--background)';
	} else {
		bodyEl.style.background = 'unset';
	}
}

function scrollBtnBehavior() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
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
	if (document.body.scrollTop > 1300) {
		window.scrollTo(0, 0);
	} else {
		window.scrollTo(0, document.body.scrollHeight);
	}
}

window.addEventListener('load', () => {	
	tommiSpaceAnimation();
	animBtn.addEventListener('click', () => {
		if (animationStatus == 'running') {
			animationStatus = 'paused';
		} else {
			animationStatus = 'running';
		}
		tommiSpaceAnimation();
	});
	scrollBtn.addEventListener('click', nowScroll);
	scrollBtnBehavior();
	window.onscroll = function() {
		scrollBtnBehavior();
	};
});
