'use strict';

const debug = require('debug')('app:game');

class Game {
	constructor() {
		debug('Создаём инстанс игры');
		this.player1 = null;
		this.player2 = null;
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
			debug(`Игрок ${id} прислал message`, msg);
		});
	}

	stop(id) {
		this[id] = null;
	}

	reset() {
		debug('Сбрасываем инстанс игры');
		this.player1 = null;
		this.player2 = null;
	}
}

module.exports = Game;
