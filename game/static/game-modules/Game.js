window.Game = (function (global) {
	const Mediator = global.Mediator;
	const GameStrategy = global.GameStrategy;
	const GameManager = global.GameManager;
	const GameScene = global.GameScene;

	const mediator = new Mediator;

	class Game {
		/**
		 * @param {GameStrategy} Strategy - реализация игровой стратегии
		 */
		constructor(Strategy) {
			if (!(Strategy instanceof GameStrategy)) {
				throw new TypeError('Strategy is not a GameStrategy');
			}
		}
	}


	return Game;
})(window);
