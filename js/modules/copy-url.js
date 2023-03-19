function copyUrl() {
	copyUrlButton = document.getElementById('copyUrl');
	navigator.clipboard.writeText(pageUrl);
	console.log('copied %s to clipboard', pageUrl);
	copyUrlButton.style.background = 'var(--green)';
}