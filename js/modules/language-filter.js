let Italian = document.querySelectorAll(".zibaldone a[hreflang='it'], .grid a[hreflang='it']");
let nonItalian = document.querySelectorAll(".zibaldone a[hreflang='en'], .grid a[hreflang='en'], .zibaldone a[hreflang='fr'], .grid a[hreflang='fr']");
let English = document.querySelectorAll(".zibaldone a[hreflang='en'], .grid a[hreflang='en']");
let nonEnglish = document.querySelectorAll(".zibaldone a[hreflang='it'], .grid a[hreflang='it'], .zibaldone a[hreflang='fr'], .grid a[hreflang='fr']");
let French = document.querySelectorAll(".zibaldone a[hreflang='fr'], .grid a[hreflang='fr']");
let nonFrench = document.querySelectorAll(".zibaldone a[hreflang='it'], .grid a[hreflang='it'], .zibaldone a[hreflang='en'], .grid a[hreflang='en']");
let allLang = document.querySelectorAll(".zibaldone a[hreflang='it'], .grid a[hreflang='it'], .zibaldone a[hreflang='en'], .grid a[hreflang='en'], .zibaldone a[hreflang='fr'], .grid a[hreflang='fr']");

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