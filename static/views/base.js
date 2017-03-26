(function () {
	'use strict';

    const BEM_NAME = 'view';

    class BaseView {

        constructor(id, classNames) {
	        const element = document.createElement('div');
	        element.id = id;
	        element.classList.add(...classNames);
	        element.hidden = true;

            this.node = element;

        }

        /**
         * Метод показывает view
         */
        show() {
            this.node.hidden = false;
        }

        hide() {
            this.node.hidden = true;
        }


    }

    window.BaseView = BaseView;
})();
