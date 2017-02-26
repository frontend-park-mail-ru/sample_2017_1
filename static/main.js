'use strict';

// alert('YES');

const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

const button = document.getElementById('button');
const input = document.getElementById('input');
const header = document.getElementById('header');

const messageInput = document.getElementById('message');
const sendMessage = document
	.querySelector('#sendButton');
const messages = document.getElementById('messages');

page2.hidden = true;
let myName = null;

button.addEventListener('click', function (event) {
	const name = input.value;
	myName = name;
	header.textContent = `Привет, ${name}!`;
	page1.hidden = true;
	page2.hidden = false;
});

sendMessage.addEventListener('click', function (event) {
	const message = messageInput.value;
	const messageText = `Сообщение от ${myName}: ${message}`;
	const newMessageElement = document.createElement('div');
	newMessageElement.textContent = messageText;
	messages.appendChild(newMessageElement);
	messageInput.value = '';
});
