'use strict';

const debug = require('debug')('app');
const express = require('express');
const ws = require('express-ws');

debug(`Создаём app`);
const app = express();
ws(app);

debug(`Сервим статику`);
app.use('/', express.static('./static'));
app.use('/lib', express.static('./node_modules/eventemitter2/lib'));


debug(`Запускаем сервер, порт = ${process.env.PORT || 3000}`);
app.listen(process.env.PORT || 3000, function () {
	console.log(`Server listen port ${process.env.PORT || 3000}`);
});
