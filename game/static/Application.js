window.Application = (function (window) {
	const Mediator = window.Mediator;
	const FinishView = window.FinishView;
	const GameView = window.GameView;
	const GreetView = window.GreetView;
	const WaitView = window.WaitView;
	const MultiPlayerStrategy = window.MultiPlayerStrategy;
	const SinglePlayerStrategy = window.SinglePlayerStrategy;
	const Game = window.Game;

	const STRATEGIES = {
		SINGLE: SinglePlayerStrategy,
		MULTI: MultiPlayerStrategy,
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


			this.subscribe(Mediator.WAITING_FOR_OPPONENT, 'waitOpponent');
			this.subscribe(Mediator.FINISH_THE_GAME, 'finishGame');
			this.subscribe(Mediator.START_THE_GAME, 'startGame');
			this.subscribe(Mediator.MODE_CHOOSED, 'onGreet');
			this.subscribe(Mediator.DESTROY_APP, 'destroy');
		}

		start() {
			this.views.greet.show();
		}

		waitOpponent(payload) {
			this.views.greet.hide();
			this.views.greet.destroy();
			delete this.views.greet;

			this.views.wait.show();
		}

		startGame(payload) {

		}

		finishGame(payload) {
			const verdict = payload.verdict;

			this.views.game.hide();
			this.views.game.destroy();
			delete this.views.game;

			this.views.finish.show(verdict && {verdict});
		}

		onGreet(payload) {
			const gamemode = (payload.mode || '').toUpperCase();
			const username = (payload.username || '').toUpperCase();
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
