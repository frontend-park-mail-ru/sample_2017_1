(function (global) {
	const Application = global.Application;
	const Mediator = global.Mediator;
	const MagicTransport = global.MagicTransport;

	Mediator.initialize();
	MagicTransport.initialize();
	new Application;

})(window);
