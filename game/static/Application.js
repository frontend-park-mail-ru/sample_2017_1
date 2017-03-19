window.Application = (function (global) {
	const Mediator = global.Mediator;
	const FinishView = global.FinishView;
	const GameView = global.GameView;
	const GreetView = global.GreetView;
	const WaitView = global.WaitView;
	const Game = global.Game;

	const STRATEGIES = {
		SINGLE: global.SinglePlayerStrategy,
		MULTI: global.MultiPlayerStrategy,
	};

	const mediator = new Mediator;

	class Application {
		constructor() {
			new FinishView;
			new GameView;
			new GreetView;
			new WaitView;

		}
	}


	return Application;
})(window);
