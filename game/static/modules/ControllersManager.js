window.ControllersManager = (function (window) {

	class ControllersManager {
		constructor() {
			console.log('ControllersManager.fn');
		}

		destroy() {
			window.removeEventListener('resize', this.bindedResizer);
		}
	}


	return ControllersManager;
})(window);
