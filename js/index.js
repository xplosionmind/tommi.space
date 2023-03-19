let i = 0;
let pageUrl = window.location.href;
let pageHeight = document.body.scrollHeight;

import './modules/scroll.js';
import './modules/toc.js';
import './modules/language-filter.js';
import './modules/copy-url.js';
import './modules/share-via-mastodon.js';

window.onload = function() {
	scrollButtonBehavior();
	window.onscroll = function() {
		tocBehavior();
		scrollButtonBehavior();
	};
};