'use strict';

const express = require('express');
const app = express();

const BASE_PATH = 'static';
app.use('/', express.static(BASE_PATH));

// Определяем, соединения на каком порту будет обрабатывать сервер
const port = process.env.PORT || 3000;
console.log(`Сервер запущен! Порт ${port}`);

// Запускаем сервер
app.listen(port);
