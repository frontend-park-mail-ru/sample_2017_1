window.Mediator = (function (global) {

	class Mediator {
		constructor() {
			if (Mediator.__instance) {
				return Mediator.__instance;
			}
			Mediator.__instance = this;


		}

		static initialize() {
			new Mediator;
		}
	}


	return Mediator;
})(window);
