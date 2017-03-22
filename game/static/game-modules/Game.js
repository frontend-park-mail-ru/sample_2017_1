window.Game = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;
	const GameManager = window.GameManager;

	const mediator = new Mediator;

	/**
	 * @global
	 * @class Game
	 */
	class Game {
		/**
		 * @param {GameStrategy} Strategy - реализация игровой стратегии
		 * @param {String} username - имя первого пользователя
		 * @param {CanvasElement} canvas - canvas-игрового поля
		 */
		constructor(Strategy, username, canvas) {
			console.log('Game.fn');
			if (!(Strategy.prototype instanceof GameStrategy)) {
				throw new TypeError('Strategy is not a GameStrategy');
			}

			this.username = username;
			this.canvas = canvas;

			this.strategy = new Strategy;
			this.manager = new GameManager(this.username, this.canvas);
		}

		stop() {
			this.manager.stop();
		}

		destroy() {
			this.manager.destroy();
			this.strategy.destroy();

			this.manager = null;
			this.strategy = null;
		}
	}


	return Game;
})(window);
