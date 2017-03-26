(function () {
	'use strict';

	const LoginView = window.LoginView;
	const ChatView = window.ChatView;
	const MenuView = window.MenuView;
	const Router = window.Router;
	const HTTP = window.HTTP;

	const http = new HTTP();
	http.BaseURL = 'https://sample-backend.herokuapp.com/api';

	let router = new Router(window.document.documentElement);

	let loginView = new LoginView(document.querySelector('.login-view'));
	let chatView = new ChatView(document.querySelector('.chat-view'));
	let menuView = new MenuView(document.querySelector('.menu-view'));

    router.register('/', loginView);
	router.register('/login', loginView);
	router.register('/chat', chatView);

	router.start();

	let loginPage = document.querySelector('#login');
	let chatPage = document.querySelector('#chat');



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

})();
