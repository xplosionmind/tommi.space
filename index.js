let i = 0;
let pageUrl = window.location.href;
let show = 'block';
let hide = 'none';
scrollButton = document.getElementById('scrollButton');

function scrollButtonBehavior() {
	scrollButton.href = 'javascript:void(0);';
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
		window.scrollTo(0, document.body.scrollHeight);
	}
}

window.onload = function() {scrollButtonBehavior()};
window.onscroll = function() {scrollButtonBehavior()};

/******************
* Language filter *
*******************/
let Italian = document.querySelectorAll(".zibaldone a[hreflang='it'], .grid a[hreflang='it']");
let nonItalian = document.querySelectorAll(".zibaldone a[hreflang='en'], .grid a[hreflang='en'], .zibaldone a[hreflang='fr'], .grid a[hreflang='fr']");
let English = document.querySelectorAll(".zibaldone a[hreflang='en'], .grid a[hreflang='en']");
let nonEnglish = document.querySelectorAll(".zibaldone a[hreflang='it'], .grid a[hreflang='it'], .zibaldone a[hreflang='fr'], .grid a[hreflang='fr']");
let French = document.querySelectorAll(".zibaldone a[hreflang='fr'], .grid a[hreflang='fr']");
let nonFrench = document.querySelectorAll(".zibaldone a[hreflang='it'], .grid a[hreflang='it'], .zibaldone a[hreflang='en'], .grid a[hreflang='en']");
let allLang = document.querySelectorAll(".zibaldone a[hreflang='it'], .grid a[hreflang='it'], .zibaldone a[hreflang='en'], .grid a[hreflang='en'], .zibaldone a[hreflang='fr'], .grid a[hreflang='fr']");

function toggleIt() {
	for (i = 0; i < nonItalian.length; i++) {
		nonItalian[i].style.display = hide;
	}
	for (i = 0; i < Italian.length; i++) {
		Italian[i].style.display = show;
	}
}
function toggleEn() {
	for (i = 0; i < nonEnglish.length; i++) {
		nonEnglish[i].style.display = hide;
	}
	for (i = 0; i < English.length; i++) {
		English[i].style.display = show;
	}
}
function toggleFr() {
	for (i = 0; i < nonFrench.length; i++) {
		nonFrench[i].style.display = hide;
	}
	for (i = 0; i < French.length; i++) {
		French[i].style.display = show;
	}
}
function toggleAll() {
	for (i = 0; i < allLang.length; i++) {
		allLang[i].style.display = show;
	}
}

function copyUrl() {
	copyUrlButton = document.getElementById('copyUrl');
	navigator.clipboard.writeText(pageUrl);
	console.log('copied %s to clipboard', pageUrl);
	copyUrlButton.style.background = 'var(--green)';
}

function shareViaMastodon() {
	let defaultUrl = localStorage['instanceUrl'];
	console.log(defaultUrl);
	let instanceUrl= prompt('Enter the address of your server:', defaultUrl);
	localStorage['instanceUrl'] = instanceUrl; 
	if ( !instanceUrl.startsWith('https://') && !instanceUrl.startsWith('http://') ) {
		instanceUrl = 'https://' + instanceUrl;
	}
	if ( !instanceUrl.endsWith('/') ) {
		instanceUrl += '/';
	}
	let author = '@tommi@pan.rent'; 
	let shareUrl = instanceUrl + 'share?text=' + encodeURIComponent(pageUrl + '\n\nby ' + author);
	window.open(shareUrl, '_blank');
}