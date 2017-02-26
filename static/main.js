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
	const username = input.value;

	showChatPage({
		username
	});
});

function showChatPage (pageData) {
	page1.hidden = true;
	page2.hidden = false;

	window.chat = new Chat({
		el: document.createElement('div')
	});

	chat.set({
		username: pageData.username,
		messages: []
	});
	chat.install(page2);
	chat.render();
}

// sendMessage.addEventListener('click', function (event) {
// 	const message = messageInput.value;
// 	const messageText = `Сообщение от ${myName}: ${message}`;
// 	const newMessageElement = document.createElement('div');
// 	newMessageElement.textContent = messageText;
// 	messages.appendChild(newMessageElement);
// 	messageInput.value = '';
// });
