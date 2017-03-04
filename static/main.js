(function () {
	'use strict';

	const Form = window.Form;
	const Chat = window.Chat;
	const HTTP = window.HTTP;

	const http = new HTTP();
	http.BaseURL = 'https://sample-backend.herokuapp.com/api';
	// http.BaseURL = 'http://localhost:3001/api';

	let loginPage = document.querySelector('#login');
	let chatPage = document.querySelector('#chat');

	let loginForm = new Form({
		el: document.createElement('div'),
		data: {
			title: 'Login',
			fields: [
				{
					name: 'user',
					type: 'text',
					placeholder: 'Логин'
				},
				{
					name: 'email',
					type: 'email',
					placeholder: 'E-mail'
				}
			],
			controls: [
				{
					text: 'Войти',
					attrs: {
						type: 'submit'
					}
				}
			]
		}
	});

	let chat = new Chat({
		el: document.createElement('div'),
	});

	loginForm.on('submit', event => {
		event.preventDefault();

		let formData = loginForm.getFormData();

		chat
			.set({
				login: formData.user,
				email: formData.email,
				messages: [],
			})
			.render();

		chat.updateMessages();

		loginPage.hidden = true;
		chatPage.hidden = false;
	});

	let chatForm = new Form({
		el: document.createElement('div'),
		data: {
			fields: [
				{
					name: 'message',
					type: 'text',
					placeholder: 'Ваше сообщение'
				}
			],
			controls: [
				{
					text: 'Отправить',
					attrs: {
						type: 'submit'
					}
				}
			]
		}
	});
	chatForm.on('submit', (event) => {
		event.preventDefault();
		let data = chatForm.getFormData();
		const form = chatForm.el.getElementsByTagName('form');
		if (form[0]) {
			form[0].reset();
		}

		chat.sendMessage(data.message);
	});

	loginPage.appendChild(loginForm.el);
	chatPage.appendChild(chat.el);
	chatPage.appendChild(chatForm.el);

	loginPage.hidden = false;
	chatPage.hidden = true;

	http
		.getPromise('/messages', null)
		.then(xhr => {
			const id = 'lalala';
			console.log(`Статус = ${xhr.status}, ответ = ${xhr.responseText}`);
			return http.getPromise('/api/messages/' + id, null);
		})
		.then(xhr => {
			console.log(`Статус = ${xhr.status}`);
		});

	window
		.fetch('https://sample-backend.herokuapp.com/api/messages', {
			method: 'get',
			mode: 'cors'
		})
		.then(response => {
			return response.json();


		})
		.then(json => {
			console.log('FETCH says:', json);

		})

})();
