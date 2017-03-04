describe('Тесты на метод получения всех сообщений', function () {

	const http = new HTTP();

	it('Метод GET /api/messages возвращает статус 200', function (done) {

		http.get('/api/messages', null, function (xhr) {
			const status = xhr.status;

			expect(status).toBe(200);

			done(true);
		});

	});

	it('Метод GET /api/messages возвращает JSON массив', function (done) {

		http.get('/api/messages', null, function (xhr) {
			const responseText = xhr.responseText;

			const parsed = JSON.parse(responseText);

			expect(parsed instanceof Array).toBe(true);

			done(true);
		});

	});

});
