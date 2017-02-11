'use strict';

const http = require('http');
const fs = require('fs');

const worker = function (request, response) {
	console.log(`${request.method} ${request.url}`);
	const url = request.url;

	let content;
	if (url === '/') {
		content = fs.readFileSync('./static/index.html', 'utf8');
	} else {
		content = fs.readFileSync('./static/hello.html', 'utf8');
	}
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(content);
	response.end();
	console.log('complete');
};

const server = http.createServer(worker);

const port = process.env.PORT || 3000;
console.log(`Сервер запущен! Порт ${port}`);

server.listen(port);
