window.GameStrategy = (function (global) {
	const Mediator = global.Mediator;

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
