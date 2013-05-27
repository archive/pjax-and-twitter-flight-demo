define([
	'libs/underscore',
	'libs/jquery',
	'libs/flight'
], function (
	_,
	$,
	Flight
) {

	return Flight.defineComponent(function List () {

		this.defaultAttrs({
			sort: '.list-sort-by-name-descending'
		});

		this._sort = function (evt, bal) {
			alert('descending!');
		};

		this.after('initialize', function() {
			this.on('click', {
				sort: this._sort
			});
		});

	});

});