'use strict';

const debug = require('debug')('app:game');

class Game {
	constructor() {
		debug('Создаём инстанс игры');
		this.player1 = null;
		this.player2 = null;
		this.inplay = false;
		this.interval = null;
		this.gameState = null;

		this.eventsMap = {
			'newPlayer': 'onNewPlayerLoggedIn',
			'newCommand': 'onNewCommand'
		}
	}

	addPlayer(player) {
		debug('Добавляем нового игрока');
		let id = null;
		if (!this.player1) {
			this.player1 = player;
			id = 'player1';
		} else if (!this.player2) {
			this.player2 = player;
			id = 'player2';
		} else {
			return;
		}

		debug(`Добавили игрока ${id}`);

		player.id = id;

		player.on('close', function () {
			debug(`Игрок ${id} отключился`);
			this.stop(id);

		}.bind(this));

		player.on('message', function (msg) {
			if (msg === 'update') {
				return;
			}
			debug(`Игрок ${id} прислал message`, msg);
			this.handleMessageFromPlayer(id, msg);
		}.bind(this));
	}

	stop(id) {
		if (this.inplay) {
			this.reset();
		}
		this[id] = null;
	}

	reset() {
		debug('Сбрасываем инстанс игры');
		['player1', 'player2'].forEach(id => this.send(id, 'SIGNAL_FINISH_GAME', {message: 'Игра окончена. Ваш противник покинул игру'}));
		this.player1 = null;
		this.player2 = null;

		this.gameState = null;
		if (this.interval) {
			clearInterval(this.interval)
		}
	}

	send(id, type, payload = null) {
		try {
			if (this[id]) {
				let body = JSON.stringify({type, payload});
				debug(`send to ${id}`, body);
				this[id].send(body);
			}
		} catch (err) {
			return null;
		}
	}

	onNewPlayerLoggedIn(id, payload) {
		debug(id, payload);
		this[id].username = payload.username;
		debug([this['player1'] && this['player1'].username, this['player2'] && this['player2'].username]);
		if (this['player1'] && this['player1'].username && this['player2'] && this['player2'].username) {
			this.startGame();
		} else {
			this.send(id, 'SIGNAL_TO_WAIT_OPPONENT');
		}
	}

	onfire(id) {
		switch (id) {
			case 'player1' : {
				this.gameState.bullets.push({
					x: this.gameState[id].xpos,
					y: this.gameState[id].ypos - 1,
					dir: 'down'
				});
				break;
			}

			case 'player2' : {
				this.gameState.bullets.push({
					x: this.gameState[id].xpos,
					y: this.gameState[id].ypos + 1,
					dir: 'up'
				});
				break;
			}
		}
	}

	onleft(id) {
		switch (id) {
			case 'player1' : {
				this.gameState[id].xpos--;
				if (this.gameState[id].xpos < 1) {
					this.gameState[id].xpos = 1;
				}
				break;
			}

			case 'player2' : {
				this.gameState[id].xpos++;
				if (this.gameState[id].xpos > 32) {
					this.gameState[id].xpos = 32;
				}
				break;
			}
		}
	}

	onright(id) {
		switch (id) {
			case 'player1' : {
				this.gameState[id].xpos++;
				if (this.gameState[id].xpos > 32) {
					this.gameState[id].xpos = 32;
				}
				break;
			}

			case 'player2' : {
				this.gameState[id].xpos--;
				if (this.gameState[id].xpos < 1) {
					this.gameState[id].xpos = 1;
				}
				break;
			}
		}
	}

	onup(id) {
		switch (id) {
			case 'player1' : {
				this.gameState[id].ypos++;
				if (this.gameState[id].ypos > 6) {
					this.gameState[id].ypos = 6;
				}
				break;
			}

			case 'player2' : {
				this.gameState[id].ypos--;
				if (this.gameState[id].ypos < 27) {
					this.gameState[id].ypos = 27;
				}
				break;
			}
		}
	}

	ondown(id) {
		switch (id) {
			case 'player1' : {
				this.gameState[id].ypos--;
				if (this.gameState[id].ypos < 1) {
					this.gameState[id].ypos = 1;
				}
				break;
			}

			case 'player2' : {
				this.gameState[id].ypos--;
				if (this.gameState[id].ypos > 32) {
					this.gameState[id].ypos = 32;
				}
				break;
			}
		}
	}

	onNewCommand(id, payload) {
		const code = payload.code;
		debug(`onNewCommand`, id, code);
		if (['fire', 'up', 'down', 'left', 'right'].includes(code.toLowerCase())) {
			this[`on${code.toLowerCase()}`](id);
		}
	}

	startGame() {
		this.gameState = {
			bullets: [],
			player1: {
				xpos: 1,
				ypos: 1,
				hp: 10,
				name: this['player1'].username
			},
			player2: {
				xpos: 18,
				ypos: 32,
				hp: 10,
				name: this['player2'].username
			}
		};
		this.send('player1', 'SIGNAL_START_THE_GAME', {
			me: this['player1'].username,
			opponent: this['player2'].username
		});
		this.send('player2', 'SIGNAL_START_THE_GAME', {
			me: this['player2'].username,
			opponent: this['player1'].username
		});
		this.interval = setInterval(() => this.gameLoop(), 100);
		this.inplay = true;
	}

	gameLoop() {

	}

	handleMessageFromPlayer(id, msg) {
		try {
			const parsed = JSON.parse(msg);
			const {type, payload} = parsed;
			debug({type, payload});
			debug(this.eventsMap[type]);
			debug(this[this.eventsMap[type]]);

			if (this.eventsMap[type] && typeof this[this.eventsMap[type]] === 'function') {
				this[this.eventsMap[type]](id, payload);
			}
		} catch (err) {
			console.error(err);
			return null;
		}
	}
}

module.exports = Game;
