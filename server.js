'use strict';

const express = require('express');
const app = express();

const BASE_PATH = 'static';
app.use('/', express.static(BASE_PATH));
app.use('/menu', express.static(BASE_PATH));
app.use('/chat', express.static(BASE_PATH));
app.use('/login', express.static(BASE_PATH));

// Определяем, соединения на каком порту будет обрабатывать сервер
const port = process.env.PORT || 3000;
console.log(`Сервер запущен! Порт ${port}`);

// Запускаем сервер
app.listen(port);
