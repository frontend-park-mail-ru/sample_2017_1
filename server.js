'use strict';

const http = require('http');
const fs = require('fs');

const worker = function (req, res) {
	const text = fs.readFileSync('./static/index.html', 'utf8');
	res.write(text);
	res.end();
};

const server = http.createServer(worker);

console.log('Сервер запущен!');
const port = process.env.PORT || 3000;

server.listen(port);
