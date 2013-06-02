define([
	'libs/underscore',
	'libs/jquery',
	'libs/flight'
], function (
	_,
	$,
	Flight
) {
	'use strict';

	return Flight.defineComponent(function Breadcrumb() {

		this.defaultAttrs({
			text: '.breadcrumb-text'
		});

		this._update = function (evt, payload) {
			this.select('text').text(payload.breadcrumb);
		};

		this.after('initialize', function () {
			this.on(document, 'breadcrumb:changed', this._update);
		});

	});

});