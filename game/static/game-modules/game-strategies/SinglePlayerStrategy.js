window.SinglePlayerStrategy = (function (global) {
	const Mediator = global.Mediator;
	const GameStrategy = global.GameStrategy;

	const mediator = new Mediator;

	class SinglePlayerStrategy extends GameStrategy {
		constructor() {
			super();
		}
	}


	return SinglePlayerStrategy;
})(window);
