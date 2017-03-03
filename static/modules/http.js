(function () {
	'use strict';

	const ALLOWED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

	class HTTP {
		constructor() {
			if (HTTP.__instance) {
				return HTTP.__instance;
			}

			this._headers = {};
			this._baseUrl = '';

			HTTP.__instance = this;
		}

		get Headers() {
			return this._headers;
		}

		set Headers(value) {
			if (!(value && ('' + value === '[object Object]'))) {
				throw new TypeError('Headers must be a plain object');
			}
			const valid = Object.keys(value).every(key => typeof value[key] === 'string');
			if (!valid) {
				throw new TypeError('Headers must be a plain object');
			}
			this._headers = value;
		}

		set BaseURL(value) {
			this._baseUrl = value;
		}

		get BaseURL() {
			return this._baseUrl;
		}

		get(address, query = null, callback = null) {
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			let url = `${this._baseUrl}${address}`;
			if (query) {
				url += Object.keys(query)
					.map(name => encodeURIComponent(`${name}=${query[name]}`))
					.join('&');
			}
			xhr.open('GET', url, true);

			Object.keys(this._headers)
				.forEach(name => xhr.setRequestHeader(name, this._headers[name]));

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (typeof callback === 'function') {
						callback.call(xhr, xhr);
					}
				}
			};

			xhr.send(null);
		}

		post(address, body = null, callback = null) {
			if (!ALLOWED_METHODS.includes(method.toUpperCase())) {
				throw new TypeError(`method должен быть одним из списка: ${ALLOWED_METHODS.join(', ')}`);
			}
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			let url = `${this._baseUrl}${address}`;
			xhr.open('POST', url, true);

			Object.keys(this._headers)
				.forEach(name => xhr.setRequestHeader(name, this._headers[name]));
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (typeof callback === 'function') {
						callback.call(xhr, xhr);
					}
				}
			};

			xhr.send(JSON.stringify(body));
		}

		delete(address, body = null, callback = null) {
			if (!ALLOWED_METHODS.includes(method.toUpperCase())) {
				throw new TypeError(`method должен быть одним из списка: ${ALLOWED_METHODS.join(', ')}`);
			}
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			let url = `${this._baseUrl}${address}`;
			xhr.open('DELETE', url, true);

			Object.keys(this._headers)
				.forEach(name => xhr.setRequestHeader(name, this._headers[name]));
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (typeof callback === 'function') {
						callback.call(xhr, xhr);
					}
				}
			};

			xhr.send(JSON.stringify(body));
		}
	}

	window.HTTP = HTTP;
})();
