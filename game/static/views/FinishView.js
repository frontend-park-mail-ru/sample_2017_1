window.FinishView = (function (window) {
	const View = window.View;

	class FinishView extends View {
		constructor() {
			super();

			this.verdict = null;
			this.verdictHeader = this._el.querySelector('.finish-view__result');
		}

		show(verdict = null) {
			super.show();

			if (!(verdict || this.verdict)) {
				return;
			}
			this.verdict = this.verdict || verdict;
			this.verdictHeader.textContent = this.verdict.verdict ?
				'Вы победили!' :
				'Вы потерпели неудачу...';

		}
	}


	return FinishView;
})(window);
