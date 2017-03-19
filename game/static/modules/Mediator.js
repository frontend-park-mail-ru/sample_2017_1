window.Mediator = (function (window) {
	const EventEmitter2 = window.EventEmitter2;

	/**
	 * Медиатор (Event Bus)
	 * @global
	 * @class Mediator
	 */
	class Mediator {
		constructor() {
			if (Mediator.__instance) {
				return Mediator.__instance;
			}
			Mediator.__instance = this;

			this.__emitter = new EventEmitter2({});
		}

		static initialize() {
			new Mediator;
		}

		/**
		 * Добавить обработчик на событие
		 * @param {String} name - имя события
		 * @param {Function} func - функция-обработчик
		 */
		on(name, func) {
			console.log('Mediator.fn.on', arguments);
			this.__emitter.on(name, func);
		}

		/**
		 * Стриггерить событие
		 * @param {String} name - имя события
		 * @param {Object} [payload=null] - объект с данными события
		 */
		emit(name, payload = null) {
			console.log('Mediator.fn.emit', arguments);
			this.__emitter.emit(name, {name, payload});
		}

		/**
		 * Убрать обработчик события
		 * @param {String} name - имя события
		 * @param {Function} func - функция-обработчик
		 */
		off(name, func) {
			console.log('Mediator.fn.off', arguments);
			this.__emitter.off(name, func);
		}
	}

	/**
	 * Имя события "Совершили выбор игрового режима"
	 * @const
	 * @type {string}
	 */
	Mediator.MODE_CHOOSED = 'MODE_CHOOSED';

	/**
	 * Имя события "Поиск оппонента в игре по сети"
	 * @const
	 * @type {string}
	 */
	Mediator.WAITING_FOR_OPPONENT = 'WAITING_FOR_OPPONENT';

	/**
	 * Имя события "Старт игры"
	 * @const
	 * @type {string}
	 */
	Mediator.START_THE_GAME = 'START_THE_GAME';

	/**
	 * Имя события "Завершение работы приложения"
	 * @const
	 * @type {string}
	 */
	Mediator.DESTROY_APP = 'DESTROY_APP';


	return Mediator;
})(window);
