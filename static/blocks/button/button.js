(function () {
	'use strict';

	class Button {
		constructor(options) {
      this._options = options;
			this._el.classList.add('button');
			this._el.innerText = this._options.text || 'Press me';
		}

    on(type, callback) {
			this._el.addEventListener(type, callback);
		}
	}

	//export
	window.Button = Button;

})();
