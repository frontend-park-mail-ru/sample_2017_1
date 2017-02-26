(function () {
	'use strict';

	// import
	let Button = window.Button;

	class Chat {

		/**
		 * Конструктор класса Chat
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

		_updateHtml (data) {
			this.el.innerHTML = `
				<h3 id="jsTitle">Ты в чате, ${data.username}!</h3>
				<div id="jsMessages" class="chat">
					<div class="cssload-wrap">
						<div class="cssload-cssload-spinner"></div>
					</div>
				</div>
			`;
		}

		_createMessage (opts, isMy = false) {
			let message = document.createElement('div');
			let email = document.createElement('div');

			message.classList.add('chat__message');
			email.classList.add('chat__email');

			if (isMy) {
				message.classList.add('chat__message_my');
			} else {
				// TODO: доделать
				// message.style.backgroundColor = `#${technolibs.colorHash(opts.email || '')}`;
			}

			message.innerHTML = opts.message;
			email.innerHTML = opts.email;
			message.appendChild(email);

			return message;
		}

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

		on (type, callback) {
			this.el.addEventListener(type, callback);
		}

		install (el) {
			el.appendChild(this.el);
		}
	}

	//export
	window.Chat = Chat;
})();
