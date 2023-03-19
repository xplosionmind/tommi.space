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