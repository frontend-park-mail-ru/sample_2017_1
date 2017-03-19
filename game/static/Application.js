window.Application = (function (global) {
	const Mediator = global.Mediator;
	const FinishView = global.FinishView;
	const GameView = global.GameView;
	const GreetView = global.GreetView;
	const WaitView = global.WaitView;
	const MultiPlayerStrategy = global.MultiPlayerStrategy;
	const SinglePlayerStrategy = global.SinglePlayerStrategy;
	const Game = global.Game;

	const STRATEGIES = {
		SINGLE: global.SinglePlayerStrategy,
		MULTI: global.MultiPlayerStrategy,
	};

	const mediator = new Mediator;

	class Application {
		constructor() {
			this.views = {
				finish: new FinishView,
				game: new GameView,
				greet: new GreetView,
				wait: new WaitView,
			};

			this._subscribed = [];
			this.mediatorCallback = function (event) {
				const name = event.name;
				const payload = event.payload;

				this._subscribed.forEach(data => {
					if (data.name !== name) {
						return;
					}

					if (data.callback && typeof this[data.callback] === 'function') {
						this[data.callback](payload);
					}
				})
			}.bind(this);

			this.game = null;
			this.opts = null;


			this.subscribe(Mediator.MODE_CHOOSED, 'onGreet');
			this.subscribe(Mediator.DESTROY_APP, 'destroy');
			this.subscribe(Mediator.WAITING_FOR_OPPONENT, 'waitOpponent');
			this.subscribe(Mediator.START_THE_GAME, 'startGame');
		}

		start() {
			this.views.greet.show();
		}

		waitOpponent() {
			this.views.greet.hide();
			this.views.greet.destroy();
			delete this.views.greet;

			this.views.wait.show();
		}

		startGame() {

		}

		onGreet(event) {
			const gamemode = (event.mode || '').toUpperCase();
			const username = (event.username || '').toUpperCase();
			if (gamemode && STRATEGIES[gamemode]) {
				const Strategy = STRATEGIES[gamemode];
				this.opts = {Strategy, username};
				this.game = new Game(Strategy, username);
				this.unsubscribe(Mediator.MODE_CHOOSED);
				this.waitOpponent();
			}
		}

		subscribe(event, callbackName) {
			this._subscribed.push({name: event, callback: callbackName});
			mediator.on(event, this.mediatorCallback);
		}

		unsubscribe(event) {
			this._subscribed = this._subscribed.filter(data => data.name !== event);
			mediator.off(event, this.mediatorCallback);
		}

		destroy() {
			this._subscribed.forEach(data => this.mediator.off(data.name, this.mediatorCallback));
			this._subscribed = null;
			this.game.stop();
			this.game.destroy();
			this.game = null;
		}
	}


	return Application;
})(window);
