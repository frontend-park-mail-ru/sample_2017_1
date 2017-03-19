window.View = (function (global) {
	const Mediator = global.Mediator;

	class View {
		constructor() {
			const name = this.constructor.name.slice(0, -4).toLowerCase();
			if (name) {
				this._el = document.getElementById(name);
			}
			if (!this._el) {
				this._el = document.createElement('div');
				document.body.appendChild(this._el);
			}
			this._destroyed = false;
			this.mediator = new Mediator;

			this._subscribed = [];
			this.mediatorCallback = function (event) {
				const name = event.name;
				const payload = event.payload;

				this._subscribed.forEach(data => {
					if (data.name !== name) {
						return;
					}

					if (data.callback && typeof this[data.callback] === 'function') {
						this[data.callback](payload);
					}
				})
			}.bind(this);

			this.hide();
		}

		subscribe(event, callbackName) {
			this._subscribed.push({name: event, callback: callbackName});
			this.mediator.on(event, this.mediatorCallback);
		}

		unsubscribe(event) {
			this._subscribed = this._subscribed.filter(data => data.name !== event);
			this.mediator.off(event, this.mediatorCallback);
		}

		show() {
			if (!this._destroyed) {
				this._el.hidden = false;
			}
		}

		hide() {
			if (!this._destroyed) {
				this._el.hidden = true;
			}
		}

		destroy() {
			if (this._destroyed) {
				return;
			}
			document.body.removeChild(this._el);
			this._subscribed.forEach(data => this.mediator.off(data.name, this.mediatorCallback));
			this._subscribed = null;
			this.mediator = null;
			this._el = null;
			this._destroyed = true;
		}
	}


	return View;
})(window);
