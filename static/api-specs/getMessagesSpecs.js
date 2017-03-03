describe('Simple http tests', function () {

	const http = new HTTP();

	beforeEach(function (done) {
		http.delete('/api/messages', null, function (xhr) {
			expect(xhr.status).toBe(200);
			done(true);
		});
	}, 5000);

	it('Запрос GET /api/messages возвращает статус 200', function (done) {
		http.get('/api/messages', null, function (xhr) {
			expect(xhr.status).toBe(200);
			done(true);
		});
	}, 5000);

});
