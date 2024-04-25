let i = 0;
scrollButton = document.getElementById('scrollButton');
homeBtn = document.getElementById('home');

document.addEventListener('DOMContentLoaded', () => {
	let homeAnimation = localStorage.getItem('homeAnimation') || true;

  // Toggle animation on button press
  const btn = document.getElementById('homeAnimationToggleBtn');
  btn.addEventListener('click', () => {
		homeBtn.classList.toggle('animate');
		if (homeAnimation) {
			homeAnimation = false;
		} else {
			homeAnimation = true;
		}
    localStorage.setItem('homeAnimation', homeAnimation);
  });

	if (!homeAnimation) {
		console.log('HomeAnimation is false!')
		homeBtn.classList.remove('animate');
	}

});

function scrollButtonBehavior() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		scrollButton.title='scroll to top';
		scrollButton.setAttribute('aria-label', 'scroll to top');
		scrollButton.classList.remove('scrollToBottom');
	} else {
		scrollButton.title='scroll to bottom';
		scrollButton.setAttribute('aria-label', 'scroll to bottom');
		scrollButton.classList.add('scrollToBottom');
	};
}

function nowScroll() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		window.scrollTo(0, 0);
	} else {
function tocBehavior() {
	let toc = document.getElementById('toc');
	if (toc) {
		let footer = document.getElementsByTagName('footer')[0];
		let footerHeight = footer.offsetHeight;
		let tocHeight = pageHeight - footerHeight - 900; // adding some random pixels to consider margins etc.
		if (document.body.scrollTop > tocHeight || document.documentElement.scrollTop > tocHeight) {
			toc.style.bottom = '-5rem';
		} else {
			toc.style.bottom = '0';
		}
		window.scrollTo(0, document.body.scrollHeight);
	}
}

window.onload = function() {
	scrollButtonBehavior();
	window.onscroll = function() {
		tocBehavior();
		scrollButtonBehavior();
	};
};

/******************
* Language filter *
*******************/
let Italian = document.querySelectorAll('.zibaldone a[hreflang=it], .grid a[hreflang=it]');
let nonItalian = document.querySelectorAll('.zibaldone a[hreflang=en], .grid a[hreflang=en], .zibaldone a[hreflang=fr], .grid a[hreflang=fr]');
let English = document.querySelectorAll('.zibaldone a[hreflang=en], .grid a[hreflang=en]');
let nonEnglish = document.querySelectorAll('.zibaldone a[hreflang=it], .grid a[hreflang=it], .zibaldone a[hreflang=fr], .grid a[hreflang=fr]');
let French = document.querySelectorAll('.zibaldone a[hreflang=fr], .grid a[hreflang=fr]');
let nonFrench = document.querySelectorAll('.zibaldone a[hreflang=it], .grid a[hreflang=it], .zibaldone a[hreflang=en], .grid a[hreflang=en]');
let allLang = document.querySelectorAll('.zibaldone a[hreflang=it], .grid a[hreflang=it], .zibaldone a[hreflang=en], .grid a[hreflang=en], .zibaldone a[hreflang=fr], .grid a[hreflang=fr]');

function toggleIt() {
	for (i = 0; i < nonItalian.length; i++) {
		nonItalian[i].style.display = 'none';
	}
	for (i = 0; i < Italian.length; i++) {
		Italian[i].style.display = 'block';
	}
}
function toggleEn() {
	for (i = 0; i < nonEnglish.length; i++) {
		nonEnglish[i].style.display = 'none';
	}
	for (i = 0; i < English.length; i++) {
		English[i].style.display = 'block';
	}
}
function toggleFr() {
	for (i = 0; i < nonFrench.length; i++) {
		nonFrench[i].style.display = 'none';
	}
	for (i = 0; i < French.length; i++) {
		French[i].style.display = 'block';
	}
}
function toggleAll() {
	for (i = 0; i < allLang.length; i++) {
		allLang[i].style.display = 'block';
	}
}

window.addEventListener('load', () => {	
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
	scrollButton.addEventListener('click', nowScroll);
});
