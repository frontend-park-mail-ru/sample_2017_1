(function () {
	'use strict';

	const HTTP = window.HTTP;

	class ChatService {
		constructor() {
			this.http = new HTTP();
		}

		sendMessage(text, login, email, callback) {
			const body = {text, login, email};
			this.http.post('/messages', body, xhr => {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			});
		}

		getMessages(callback) {
			this.http.get('/messages', null, function () {
				callback.call(this, JSON.parse(this.responseText || ''));
			});
		}

		removeAllMessages(callback) {
			this.http.delete('/messages', null, xhr => {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			});
		}
	}

	window.ChatService = ChatService;
})();
