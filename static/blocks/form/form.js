(function () {
	'use strict';

	// import
	let Button = window.Button;

	class Form {

		/**
		 * Взять данные формы
		 * @return {object}
		 */
		getFormData () {
			let form = this.el;
			let elements = form.elements;
			let fields = {};

			Object.keys(elements).forEach(element => {
				let name = elements[element].name;
				let value = elements[element].value;

				if (!name) {
					return;
				}

				fields[name] = value;
			});

			return fields;
		}

		constructor(options) {
			this.attrs = options.attrs;
			this.fields = options.fields;
			this.controls = options.controls;
			this.el = document.createElement('form');
		}

		renderFields() {
			return this.fields.reduce((prev, attrs) => {
				let attrsString = Object.keys(attrs).map((attrName) => {
					return `${attrName}="${attrs[attrName]}"`;
				}).join(' ');
				return prev + `<input ${attrsString}/>`
			}, '');
		}

		render() {
			let fields = this.renderFields();
			this.el.innerHTML = fields;

			let controls = this.controls.forEach((control) => {
				let button = new Button(control);
				button.render();

				this.el.appendChild(button.el);
			});
		}

		on(name, callback) {
			this.el.addEventListener(name, callback);
		}

	}

	//export
	window.Form = Form;
})();
