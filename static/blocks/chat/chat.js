(function () {
	'use strict';

	// import
	// form, button
	const tmpl = window.chat_tmpl;
	const ChatService = window.ChatService;

	class Chat {
		/**
		 * Конструктор класса Chat
		 * @param {Object} data
		 * @param {HTMLElement} el
		 */
		constructor({data = {}, el}) {
			this.data = data;
			this.el = el;

			this.chatService = new ChatService();
			this.updateMessages();
		}

		/**
		 * Обновляем состояние DOM, не теряем обработчики событий
		 */
		render() {
			this._updateHtml(this.data);
			this._renderMessages(this.data.messages);
		}

		/**
		 * Обновить данные компонента
		 * @param {Object} data - данные компонента
		 */
		set(data) {
			this.data = data;
			return this;
		}

		/**
		 * Интегрируем копонент в DOM
		 * @param {HTMLElement} el
		 */
		install(el) {
			el.appendChild(this.el);
		}

		/**
		 * Обновляем HTML элемента
		 * @private
		 * @param {Object} data
		 */
		_updateHtml(data) {
			this.el.innerHTML = tmpl(data);
		}

		/**
		 * Создаем элемент одного сообщения
		 * @private
		 * @param {String} text - текст сообщения
		 * @param {String} login - имя отправителя
		 * @param {String} email - email отправителя
		 * @param {Number} timestamp - дата отправки
		 * @param {Boolean} isMy - принадлежность сообщения
		 * @returns {Element}
		 */
		static createMessage({text, login, email, timestamp}, isMy = false) {
			const messageContentText = text;
			const messageFromText = `Сообщение от ${login} (${new Date(timestamp).toLocaleTimeString('ru-RU')})`;

			// Создаём новый элемент
			const newMessageElement = document.createElement('li');
			const newMessageFromElement = document.createElement('span');
			const newMessageContentElement = document.createElement('blockquote');
			const clearfixElement = document.createElement('div');

			newMessageElement.classList.add('chat__message');
			if (isMy) {
				newMessageElement.classList.add('chat__message_my');
			}
			newMessageFromElement.classList.add('from');
			clearfixElement.classList.add('clearfix');

			newMessageFromElement.textContent = messageFromText;
			newMessageContentElement.textContent = messageContentText;

			newMessageElement.appendChild(newMessageFromElement);
			newMessageElement.appendChild(clearfixElement);
			newMessageElement.appendChild(newMessageContentElement);

			return newMessageElement;
		}

		/**
		 * Обновляем HTML сообщений
		 */
		_renderMessages() {
			if (!this.data.messages.length) {
				return;
			}

			let messages = this.el.querySelector('#jsMessages');
			messages.innerHTML = '';

			this.data.messages.forEach(item => {
				let message = Chat.createMessage(item, item.email === this.data.email);
				messages.appendChild(message);
			});

			messages.scrollTop = messages.scrollHeight;
		}

		sendMessage(message) {
			this.chatService.sendMessage(message, this.data.login, this.data.email, response => this.updateMessages());
		}

		updateMessages() {
			this.chatService.getMessages(messages => {
				this.data.messages = messages;
				this.render();
			});
		}
	}

	//export
	window.Chat = Chat;
})();
