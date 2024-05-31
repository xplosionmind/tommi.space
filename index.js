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

let Italian = document.querySelectorAll('.list.entries a[hreflang=it], .grid a[hreflang=it]');
let nonItalian = document.querySelectorAll('.list.entries a[hreflang=en], .grid a[hreflang=en], .list.entries a[hreflang=fr], .grid a[hreflang=fr]');
let English = document.querySelectorAll('.list.entries a[hreflang=en], .grid a[hreflang=en]');
let nonEnglish = document.querySelectorAll('.list.entries a[hreflang=it], .grid a[hreflang=it], .list.entries a[hreflang=fr], .grid a[hreflang=fr]');
let French = document.querySelectorAll('.list.entries a[hreflang=fr], .grid a[hreflang=fr]');
let nonFrench = document.querySelectorAll('.list.entries a[hreflang=it], .grid a[hreflang=it], .list.entries a[hreflang=en], .grid a[hreflang=en]');
let allLang = document.querySelectorAll('.list.entries a[hreflang=it], .grid a[hreflang=it], .list.entries a[hreflang=en], .grid a[hreflang=en], .list.entries a[hreflang=fr], .grid a[hreflang=fr]');

function toggleIt() {
	for (let i = 0; i < nonItalian.length; i++) {
		nonItalian[i].style.display = 'none';
	}
	for (let i = 0; i < Italian.length; i++) {
		Italian[i].style.display = 'block';
	}
}
function toggleEn() {
	for (let i = 0; i < nonEnglish.length; i++) {
		nonEnglish[i].style.display = 'none';
	}
	for (let i = 0; i < English.length; i++) {
		English[i].style.display = 'block';
	}
}
function toggleFr() {
	for (let i = 0; i < nonFrench.length; i++) {
		nonFrench[i].style.display = 'none';
	}
	for (let i = 0; i < French.length; i++) {
		French[i].style.display = 'block';
	}
}
function toggleAll() {
	for (let i = 0; i < allLang.length; i++) {
		allLang[i].style.display = 'block';
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

	if (document.querySelectorAll('[data-target-lang]')) {
		for (const button of document.querySelectorAll('[data-target-lang=en]')) {
			button.addEventListener('click', toggleEn);
		};
		for (const button of document.querySelectorAll('[data-target-lang=fr]')) {
			button.addEventListener('click', toggleFr);
		};
		for (const button of document.querySelectorAll('[data-target-lang=it]')) {
			button.addEventListener('click', toggleIt);
		};
		for (const button of document.querySelectorAll('[data-target-lang=all]')) {
			button.addEventListener('click', toggleAll);
		};
	};

	scrollBtn.addEventListener('click', nowScroll);
	scrollBtnBehavior();
	window.onscroll = function() {
		scrollBtnBehavior();
	};

});
