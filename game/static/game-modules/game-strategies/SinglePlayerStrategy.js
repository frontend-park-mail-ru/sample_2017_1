window.SinglePlayerStrategy = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;

	const mediator = new Mediator;

	class SinglePlayerStrategy extends GameStrategy {
		constructor() {
			super();
		}
	}


	return SinglePlayerStrategy;
})(window);
