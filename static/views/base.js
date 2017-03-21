(function () {

    const BEM_NAME = 'view';

    class BaseView {

        constructor(node) {
            this.node = node;
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