window.MultiPlayerStrategy = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;
	const MagicTransport = window.MagicTransport;

	const mediator = new Mediator;
	const transport = new MagicTransport;

	const gameEventsReseived = [
		'SIGNAL_TO_WAIT_OPPONENT',
		'FOUND_THE_OPPONENT',
		'RECEIVE_GAME_INFO',
		'START_THE_GAME',
		'SIGNAL_OPPONENT_LEAVED',
		'SIGNAL_WE_ARE_WIN',
		'SIGNAL_WE_ARE_LOOSE',
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
	}


	return MultiPlayerStrategy;
})(window);
