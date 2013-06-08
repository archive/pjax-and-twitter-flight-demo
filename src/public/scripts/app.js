require([
	'libs/underscore',
	'libs/jquery',
	'libs/flight',
	'bootstrap'
], function (
	_,
	$,
	Flight,
	Bootstrap
) {
	'use strict';

	if (!$ || !_ || !Flight || !Bootstrap) {
		throw 'error: missing primary dependencies';
	}

	require.config({ baseUrl: '/scripts/' });

	var bootstrap = new Bootstrap();
	var pageComponent = $('#page-component').val();
	bootstrap.load(pageComponent);

	console.log('boot time', window.performance.now() / 1000, 'sec');
});