window.MagicTransport = (function (global) {
	const Mediator = global.Mediator;

	class MagicTransport {
		constructor() {
			if (MagicTransport.__instance) {
				return MagicTransport.__instance;
			}
			MagicTransport.__instance = this;

			this.mediator = new Mediator();


		}

		static initialize() {
			new MagicTransport;
		}


	}


	return MagicTransport;
})(window);
