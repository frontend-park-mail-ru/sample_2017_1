'use strict';

// Импортируем модули, отвечающие за работу с http и с файловой системой
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_PATH = 'static'

// Создаём фукнцию-обработчик запросов
const worker = function (request, response) {
	// Выводим лог
	console.log(`${request.method} ${request.url}`);
	const url = request.url;

	// Определяем, какой из файлов мы будем использовать
	let content;
	if (url === '/') {
		content = fs.readFileSync(`${BASE_PATH}/index.html`, 'utf8');
	} else {
		let filePath = path.resolve(`${BASE_PATH}${url}`); // наш файл лежит здесь
		try {
			fs.accessSync(filePath); // проверим!
		} catch (e) {
			content = e.toString();
		}

		if (!content) {
			content = fs.readFileSync(filePath, 'utf8');
		}
	}

	// Записываем статус в ответ
	response.writeHead(200);

	// Данные в ответ
	response.write(content);
	response.end();
	console.log('complete');
};

// Создаём сервер
const server = http.createServer(worker);

// Определяем, соединения на каком порту будет обрабатывать сервер
const port = process.env.PORT || 3000;
console.log(`Сервер запущен! Порт ${port}`);

// Запускаем сервер
server.listen(port);
