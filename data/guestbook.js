import Fetch from '@11ty/eleventy-fetch';

export default function () {
	try {
		const messages_api = 'https://guestbook.tommi.space/api/v2/get-guestbook-messages/1';
		return Fetch(messages_api, {
			duration: '1s',
			type: 'json',
		});
	} catch (e) {
		console.error('Guestbook error:', e);
	}
};
