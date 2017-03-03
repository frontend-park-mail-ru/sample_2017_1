(function () {
	'use strict';

	const Form = window.Form;
	const Chat = window.Chat;
	const HTTP = window.HTTP;

	const http = new HTTP();
	http.BaseURL = 'https://sample-backend.herokuapp.com/api';

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
				username: formData.user,
				email: formData.email,
				messages: [],
			})
			.render();

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

	http.get('/messages', null, ({responseText}) => console.log(responseText));

})();
