requirejs.config({

	deps: ['app'],

	shim: {
		'libs/underscore': {
			exports: '_'
		},

		'libs/jquery': {
			exports: '$'
		},

		'libs/flight': {
			deps: ['libs/jquery']
		},

		'libs/jquery.history': {
			deps: ['libs/jquery'],
			exports: 'History'
		}
	},

	paths: {
		requireLib: '../scripts/libs/require'
	},

	include: 'requireLib'

});