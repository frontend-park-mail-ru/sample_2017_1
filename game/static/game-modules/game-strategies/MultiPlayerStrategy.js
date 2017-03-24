window.MultiPlayerStrategy = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;
	const MagicTransport = window.MagicTransport;

	const mediator = new Mediator;
	const transport = new MagicTransport;

	const gameEventsReseived = [
		'SIGNAL_TO_WAIT_OPPONENT',
		'RECEIVE_GAME_INFO',
		'START_THE_GAME',
		'SIGNAL_FINISH_GAME',
		'NEW_GAME_STATE'
	];

	class MultiPlayerStrategy extends GameStrategy {
		constructor() {
			console.log('MultiPlayerStrategy.fn');
			super();
		}

		onLoggedIn(payload) {
			console.log('MultiPlayerStrategy.fn.onLoggedIn', arguments);
			this.me = payload.username;

			this.fireWaitOpponent();
			transport.send('newPlayer', {username: payload.username});
		}

		onNewCommand(payload) {
			console.log('MultiPlayerStrategy.fn.onNewCommand', payload);
			if (this._pressed('FIRE', payload)) {
				transport.send('newCommand', {code: 'FIRE'});
				return;
			}
			if (this._pressed('LEFT', payload)) {
				transport.send('newCommand', {code: 'LEFT'});
				return;
			}
			if (this._pressed('RIGHT', payload)) {
				transport.send('newCommand', {code: 'RIGHT'});
				return;
			}
			if (this._pressed('UP', payload)) {
				transport.send('newCommand', {code: 'UP'});
				return;
			}
			if (this._pressed('DOWN', payload)) {
				transport.send('newCommand', {code: 'DOWN'});
				return;
			}
		}
	}


	return MultiPlayerStrategy;
})(window);
