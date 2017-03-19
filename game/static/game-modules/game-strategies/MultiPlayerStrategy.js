window.MultiPlayerStrategy = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;

	const mediator = new Mediator;

	class MultiPlayerStrategy extends GameStrategy {
		constructor() {
			super();
		}
	}


	return MultiPlayerStrategy;
})(window);
