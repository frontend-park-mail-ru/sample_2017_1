window.GameStrategy = (function (window) {
	const Mediator = window.Mediator;

	const mediator = new Mediator;

	class GameStrategy {
		constructor() {
			if (this.constructor.name === GameStrategy.name) {
				throw new TypeError('Can not create instance of GameStrategy');
			}

		}
	}



	return GameStrategy;
})(window);
