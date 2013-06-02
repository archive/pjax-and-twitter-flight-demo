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

	return Flight.defineComponent(function List() {

		this.defaultAttrs({
			sort: '.list-sort-by-name-descending'
		});

		this._sort = function () {
			alert('descending!');
		};

		this.after('initialize', function () {
			this.on('click', {
				sort: this._sort
			});
		});

	});

});