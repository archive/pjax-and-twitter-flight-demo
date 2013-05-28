define([
	'components/header',
	'components/breadcrumb',
	'services/pjax'
], function (
	Header,
	Breadcrumb,
	Pjax
) {

	var Bootstrap = function () {
	};

	var p = Bootstrap.prototype;

	p.load = function(pageComponent) {
		Header.attachTo('.header');
		Breadcrumb.attachTo('.breadcrumb');

		Pjax.attachTo(document);

		require([
			pageComponent
		], function (
			PageComponent
		) {
			PageComponent.attachTo('.view');
		});
	};

	return Bootstrap;

});