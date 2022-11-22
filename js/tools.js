// Scroll to top/bottom button

// NOT WORKING
function scrollTo() {
	//window.scrollBottom(0,document.body.scrollHeight);
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
window.onload = function () {
	const scrollBtn = document.createElement('button');
	scrollBtn.innerHTML = '&uarr;';
	scrollBtn.setAttribute('id', 'scroll-btn');
	scrollBtn.setAttribute('onclick', 'scrollTo');
	document.body.appendChild(scrollBtn);
}

// NOT WORKING:
const scrollbutton = document.getElementById('scrollbutton');
window.onscroll = function() {scroll()};
function scroll() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		scrollbutton.href='#';
		scrollbutton.title='scroll to top';
		scrollbutton.setAttribute('aria-label', 'scroll to top');
	} else {
		scrollbutton.href='#0';
		scrollbutton.title='scroll to bottom';
		scrollbutton.setAttribute('aria-label', 'scroll to bottom');
	};
}