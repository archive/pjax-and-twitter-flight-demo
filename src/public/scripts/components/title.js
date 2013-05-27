define([
	'libs/underscore',
	'libs/jquery',
	'libs/flight'
], function (
	_,
	$,
	Flight
) {

	return Flight.defineComponent(function Title () {

		this._update = function (evt, payload) {
			document.title = payload.title;
		};

		this.after('initialize', function() {
			this.on(document, 'title:changed', this._update);
		});

	});

});