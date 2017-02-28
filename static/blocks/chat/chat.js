(function () {
	'use strict';

	// import
	// form, button
	// const tmpl = window.chat_tmpl;

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
			this.el.innerHTML = `
				<div id="jsMessages" class="chat">
					<h3>Привет, ${data.login}</h3>
				</div>
			`;
		}

		/**
		 * Создаем элемент одного сообщения
		 * @private
		 * @param {Object} opts
		 * @param {boolean} isMy
		 */
		_createMessage (opts, isMy = false) {
			let message = document.createElement('div');
			let login = document.createElement('div');

			message.classList.add('chat__message');
			login.classList.add('chat__email');

			message.classList.add('chat__message_my');

			message.innerHTML = opts.message;
			login.innerHTML = opts.login;
			message.appendChild(login);

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
				let message = this._createMessage(item, item.login === this.data.login);
				messages.appendChild(message);
			});

			messages.scrollTop = messages.scrollHeight;
		}

		sendMessage (message) {
			this.data.messages.push({message, login: this.data.login});
			this._renderMessages(this.data.messages);
		}
	}

	//export
	window.Chat = Chat;
})();
