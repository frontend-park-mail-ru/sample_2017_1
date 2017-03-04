describe('Тесты на отправку сообщений', function () {

	const http = new HTTP();

	beforeEach(function (done) {

		http.delete('/api/messages', null, function (xhr) {
			expect(xhr.status).toBe(200);
			done(true);
		});

	});

	it('Запрос POST /api/messages отвечает 200', function (done) {
		const body = {
			text: 'test',
			login: 'Jhon Snow',
			email: 'a@mail.ru'
		};

		http.post('/api/messages', body, function (xhr) {
			expect(xhr.status).toBe(200);
			done(true);
		});

	});

	it('Запрос POST /api/messages с неправильным данными возвращает 400', function (done) {
		const body = {
			text: 'test',
			login: 'Jhon Snow',
			email: 'lololo'
		};

		http.post('/api/messages', body, function (xhr) {
			expect(xhr.status).toBe(400);
			done(true);
		});

	});

	it('Запрос POST /api/messages с неправильным данными возвращает 400', function (done) {
		const body = {
			text: 'test',
			login: 'Jhon Snow',
			email: 'user@mail.ru'
		};

		http.post('/api/messages', body, function (xhr) {
			expect(xhr.status).toBe(200);

			http.get('/api/messages', null, function (xhr) {

				const messagesArray = JSON.parse(xhr.responseText);

				expect(messagesArray.length).toBe(1);

				delete messagesArray[0].timestamp;

				expect(messagesArray[0]).toEqual(body);

				done(true);
			});
		});

	});

});
