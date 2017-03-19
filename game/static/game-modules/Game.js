window.Game = (function (global) {
	const Mediator = global.Mediator;
	const GameStrategy = global.GameStrategy;
	const GameManager = global.GameManager;
	const GameScene = global.GameScene;

	const mediator = new Mediator;

	/**
	 * @global
	 * @class Game
	 */
	class Game {
		/**
		 * @param {GameStrategy} Strategy - реализация игровой стратегии
		 * @param {String} username - имя пользователя
		 */
		constructor(Strategy, username) {
			if (!(Strategy.prototype instanceof GameStrategy)) {
				throw new TypeError('Strategy is not a GameStrategy');
			}

			this.Strategy = Strategy;
			this.username = username;
		}
	}


	return Game;
})(window);
