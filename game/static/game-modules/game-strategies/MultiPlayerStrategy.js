window.MultiPlayerStrategy = (function (global) {
	const Mediator = global.Mediator;
	const GameStrategy = global.GameStrategy;

	const mediator = new Mediator;

	class MultiPlayerStrategy extends GameStrategy {
		constructor() {
			super();
		}
	}


	return MultiPlayerStrategy;
})(window);
