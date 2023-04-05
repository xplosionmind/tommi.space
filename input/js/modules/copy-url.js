window.addEventListener('load', () => {
  for (const button of document.querySelectorAll('#copyUrl')) {
    button.addEventListener('click', copyUrl);
  }
});

function copyUrl() {
	copyUrlButton = document.getElementById('copyUrl');
	navigator.clipboard.writeText(pageUrl);
	console.log('copied %s to clipboard', pageUrl);
	copyUrlButton.style.background = 'var(--green)';
}
