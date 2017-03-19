window.ControllersManager = (function (window) {

	class ControllersManager {
		constructor() {
			if (ControllersManager.__instance) {
				return ControllersManager.__instance;
			}
			ControllersManager.__instance = this;


		}

		static initialize() {
			new ControllersManager;
		}

		stop() {
			ControllersManager.__instance = null;
		}
	}


	return ControllersManager;
})(window);
