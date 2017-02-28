(function () {
	'use strict';

	// import
	// form, button
	const tmpl = window.chat_tmpl;

	class Chat {

		/**
		 * Конструктор класса Chat
		 * @param {Object} params
		 * @param {Object} params.data
		 * @param {HTMLElement} params.el
 		 */
		constructor ({ data = {}, el }) {
			this.data = data;
			this.el = el;
		}

		/**
		 * Обновляем состояние DOM, не теряем обработчики событий
		 */
		render () {
			this._updateHtml(this.data);
			this._renderMessages(this.data.messages);
		}

		/**
		 * Обновить данные компонента
		 * @param {Object} data - данные компонента
		 */
		set (data) {
			this.data = data;

			return this;
		}

		/**
		 * Интегрируем копонент в DOM
		 * @param {HTMLElement} el
		 */
		install (el) {
			el.appendChild(this.el);
		}

		/**
		 * Обновляем HTML элемента
		 * @private
		 * @param {Object} data
		 */
		_updateHtml (data) {
			this.el.innerHTML = tmpl(data);
		}

		/**
		 * Создаем элемент одного сообщения
		 * @private
		 * @param {Object} opts
		 * @param {boolean} isMy
		 */
		_createMessage (opts, isMy = false) {
			let message = document.createElement('div');
			let email = document.createElement('div');

			message.classList.add('chat__message');
			email.classList.add('chat__email');

			message.classList.add('chat__message_my');

			message.innerHTML = opts.message;
			email.innerHTML = opts.email;
			message.appendChild(email);

			return message;
		}

		/**
		 * Обновляем HTML сообщений
		 * @private
		 * @param {Object} opts
		 * @param {boolean} isMy
		 */
		_renderMessages (items) {
			if (!items.length) {
				return;
			}

			let messages = this.el.querySelector('#jsMessages');
			messages.innerHTML = '';

			items.forEach(item => {
				let message = this._createMessage(item, item.email === this.data.email);
				messages.appendChild(message);
			});

			messages.scrollTop = messages.scrollHeight;
		}

		sendMessage (message) {
			this.data.messages.push({message, email: this.data.email});
			this._renderMessages(this.data.messages);
		}
	}

	//export
	window.Chat = Chat;
})();
