'use strict';

// Получаем ссылки на элементы страницы
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

// Элементы page#1
const button = document.getElementById('button');
const input = document.getElementById('input');
const header = document.getElementById('header');

// Элементы page#2
const messageInput = document.getElementById('message');
const sendMessage = document.querySelector('input[type=submit]');
const messages = document.getElementById('messages');

// Скрываем вторую страницу
page2.hidden = true;

// Заводим переменную под имя пользователя
let myName = null;

// Добавляем обработчик события на кнопку "логина"
button.addEventListener('click', function (event) {
	// По клику на кнопу получаем введённое имя
	const name = input.value;
	myName = name;

	// Обновляем заголовок
	header.textContent = `Привет, ${name}!`;

	// Переключаем страницы
	page1.hidden = true;
	page2.hidden = false;
});

// Добавляем обработчик события на кнопку "отправки сообщения"
sendMessage.addEventListener('click', function (event) {
	const message = messageInput.value;
	const messageText = `Сообщение от ${myName}: ${message}`;

	// Создаём новый элемент
	const newMessageElement = document.createElement('div');
	newMessageElement.textContent = messageText;

	// Добавляем его на страницу
	messages.appendChild(newMessageElement);
	messageInput.value = '';
});
