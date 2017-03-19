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

			this.subscribe(Mediator.MODE_CHOOSED, 'onGreet');
		}

		subscribe(event, callbackName) {
			this._subscribed.push({name: event, callback: callbackName});
			mediator.on(event, this.mediatorCallback);
		}

		unsubscribe(event) {
			this._subscribed = this._subscribed.filter(data => data.name !== event);
			mediator.off(event, this.mediatorCallback);
		}

		start() {
			this.views.greet.show();
			// mediator.on()
		}

		onGreet(event) {
			console.dir(event);

		}

		destroy() {
			this._subscribed.forEach(data => this.mediator.off(data.name, this.mediatorCallback));
			this._subscribed = null;
		}
	}


	return Application;
})(window);
