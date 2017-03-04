describe('Тесты на метод получения всех сообщений', function () {

	const http = new HTTP();

	beforeEach(function (done) {

		http.delete('/api/messages', null, function (xhr) {
			expect(xhr.status).toBe(200);
			done(true);
		});

	}, 5000);

	it('Метод GET /api/messages возвращает статус 200', function (done) {

		http.get('/api/messages', null, function (xhr) {
			const status = xhr.status;

			expect(status).toBe(200);

			done(true);
		});

	}, 5000);

	it('Метод GET /api/messages возвращает JSON массив', function (done) {

		http.get('/api/messages', null, function (xhr) {
			const responseText = xhr.responseText;

			const parsed = JSON.parse(responseText);

			expect(parsed instanceof Array).toBe(true);

			done(true);
		});

	}, 5000);
});
