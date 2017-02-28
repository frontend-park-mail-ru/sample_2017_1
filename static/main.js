'use strict';

(function () {
	// import
	let Button = window.Button;
	let Form = window.Form;
	let Chat = window.Chat;

	let loginPage = document.querySelector('#login');
	let chatPage = document.querySelector('#chat');

	// let loginForm = new Form({
	// 		el: document.createElement('div'),
	// 		data: {
	// 			title: 'Login',
	// 			fields: [
	// 				{
	// 					name: 'user',
	// 					type: 'text'
	// 				},
	// 				{
	// 					name: 'email',
	// 					type: 'email'
	// 				}
	// 			],
	// 			controls: [
	// 				{
	// 					text: 'Войти',
	// 					attrs: {
	// 						type: 'submit'
	// 					}
	// 				}
	// 			]
	// 		}
	// 	});

		// let chat = new Chat({
		// 	el: document.createElement('div'),
		// });
		//
		// loginForm.on('submit', event => {
		// 	event.preventDefault();
		//
		// 	let formData = loginForm.getFormData();
		//
		// 	chat.set({
		// 		username: formData.user,
		// 		email: formData.email,
		// 		messages: [],
		// 	})
		// 	.render();
		//
		// 	loginPage.hidden = true;
		// 	chatPage.hidden = false;
		// });
		//
		// let chatForm = new Form({
		// 	el: document.createElement('div'),
		// 	data: {
		// 		fields: [
		// 			{
		// 				name: 'message',
		// 				type: 'text',
		// 				placeholder: 'Ваше сообщение'
		// 			}
		// 		],
		// 		controls: [
		// 			{
		// 				text: 'Отправить',
		// 				attrs: {
		// 					type: 'submit'
		// 				}
		// 			}
		// 		]
		// 	}
		// });
		// chatForm.on('submit', (event) => {
		// 	event.preventDefault();
		// 	let data = chatForm.getFormData();
		//
		// 	chat.sendMessage(data.message);
		// });

		// loginPage.appendChild(loginForm.el);
		// chatPage.appendChild(chat.el);
		// chatPage.appendChild(chatForm.el);
		// loginPage.appendChild()

		let form = new Form({
			attrs: [],
			fields: [
				{
					type: 'text',
					name: 'login',
					placeholder: 'Логин...'
				},
				{
					type: 'password',
					name: 'password',
					placeholder: 'Пароль...'
				}
			],
			controls: [
				{
					attrs: {
						type: 'submit',
					},
					text: 'Войти'
				}
			]
		});

		form.render();

		form.on('submit', (event) => {
			event.preventDefault();

			let {login, password} = form.getFormData();
			loginPage.hidden = true;
			chatPage.hidden = false;

			let chat = new Chat({
				el: document.createElement('div'),
				data: {
					login,
					messages: []
				}
			});

			let chatForm = new Form({
				fields: [
					{
						type: 'text',
						name: 'message',
						placeholder: 'Введите сообщение...'
					}
				],
				controls: [
					{
						attrs: {
							type: 'submit'
						},
						text: 'Отправить'
					}
				]
			});

			chatForm.render();
			chat.render();

			chatForm.on('submit', (event) => {
				event.preventDefault();

				let {message} = chatForm.getFormData();
				chat.sendMessage(message);

				chatForm.el.reset();
			});

			chatPage.appendChild(chat.el);
			chatPage.appendChild(chatForm.el);
		});

		loginPage.appendChild(form.el);

		loginPage.hidden = false;
		chatPage.hidden = true;

})()
