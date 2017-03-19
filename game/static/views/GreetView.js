window.GreetView = (function (window) {
	const View = window.View;

	class GreetView extends View {
		constructor() {
			super();

			this.greetForm = this._el.querySelector('.greet-form');
			this.usernameInput = this.greetForm.elements['username'];
			this.chooseSingle = this.greetForm.elements['choose-single'];
			this.chooseMulti = this.greetForm.elements['choose-multi'];

			this.chooseSingle.addEventListener('click', this.onChoose.bind(this, 'single'));
			this.chooseMulti.addEventListener('click', this.onChoose.bind(this, 'multi'));
		}

		onChoose(mode, event) {
			const username = (this.usernameInput.value || '').trim();
			if (!username) {
				alert('Пустое имя!');
				this.usernameInput.value = '';
				return;
			}

			this.mediator.emit(Mediator.MODE_CHOOSED, {username, mode});
		}
	}


	return GreetView;
})(window);
