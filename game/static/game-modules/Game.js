window.Game = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;
	const GameManager = window.GameManager;
	const GameScene = window.GameScene;

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
