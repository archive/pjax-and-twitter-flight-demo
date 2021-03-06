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

	return Flight.defineComponent(function Search() {

		this.defaultAttrs({
			searchText: '.search-text',
			searchButton: '.search-action'
		});

		this._search = function () {
			var value = this.select('searchText').val();
			alert('search on ' + value);
		};

		this.after('initialize', function () {
			this.on('click', {
				searchButton: this._search
			});
		});

	});

});