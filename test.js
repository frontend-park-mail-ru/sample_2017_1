'use strict';

const f = function (resolve, reject) {
	return 1;
};

const promise = new Promise(f);

promise
	.then(function (arg) {
		console.log(arg);
		return new Promise(function (resolve) {
			setTimeout(function () {
				console.log(2);
				resolve();
			}, 300);
		});
	})
	.then(function () {
		return new Promise(function (resolve) {
			setTimeout(function () {
				console.log(3);
				resolve();
			}, 300);
		});
	})
	.then(function () {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {

				reject();
			}, 300);
		});
	})
	.then(function () {
		console.log('finish!');
	})
	.catch(function () {
		console.log('error');
	});


const parallelPromise = Promise.all([
	new Promise(),
	new Promise(),
	new Promise(),
	new Promise()
]);
