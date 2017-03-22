window.GameManager = (function (window) {
	const Mediator = window.Mediator;
	const EVENTS = window.EVENTS;
	const GameScene = window.GameScene;
	const ControllersManager = window.ControllersManager;

	const mediator = new Mediator;

	class GameManager {
		constructor(username, canvas) {
			console.log('GameManager.fn');

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

			this.username = username;
			this.scene = new GameScene(canvas);
			this.controllers = new ControllersManager();
		}

		startGameLoop() {
			requestAnimationFrame(this.gameLoop.bind(this));
		}

		gameLoop() {


			requestAnimationFrame(this.gameLoop.bind(this));
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
			this._subscribed.forEach(data => mediator.off(data.name, this.mediatorCallback));
			this._subscribed = null;

			this.scene.destroy();
			this.controllers.destroy();
		}
	}


	return GameManager;
})(window);
