window.MagicTransport = (function (window) {
	const Mediator = window.Mediator;


	class MagicTransport {
		constructor() {
			if (MagicTransport.__instance) {
				return MagicTransport.__instance;
			}
			MagicTransport.__instance = this;

			this.mediator = new Mediator();


			const address = `ws://${location.host}/ws`;
			this.ws = new WebSocket(address);
			this.ws.onopen = function (event) {
				console.log(`WebSocket on address ${address} opened`);

				console.dir(this.ws);

				this.ws.onmessage = this.handleMessage.bind(this);
				const interval =  this.interval = setInterval(() => this.ws.send('update'), 30 * 60);

				this.ws.onclose = function () {
					clearInterval(interval);
				};
			}.bind(this);
		}

		handleMessage(event) {
			const messageText = event.message;
			const message = JSON.parse(messageText);

			this.mediator.emit(message.type, message.payload);
		}

		send(type, payload) {
			this.ws.send(JSON.stringify({type, payload}));
		}

		static initialize() {
			new MagicTransport;
		}
	}


	return MagicTransport;
})(window);
