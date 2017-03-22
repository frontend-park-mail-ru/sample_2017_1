window.FinishView = (function (window) {
	const View = window.View;

	class FinishView extends View {
		constructor() {
			super();

			this.results = null;
			this.verdictHeader = this._el.querySelector('.finish-view__result');
		}

		show(results) {
			super.show();

			if (!(results || this.results)) {
				return;
			}
			this.results = this.results || results;

			const text = this.results.text || 'Игра окончена!';
			this.verdictHeader.textContent = text;
		}
	}


	return FinishView;
})(window);
