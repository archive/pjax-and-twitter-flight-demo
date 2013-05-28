define([
	'libs/underscore',
	'libs/jquery',
	'libs/flight',
	'libs/jquery.history',
	'global/window'
], function (
	_,
	$,
	Flight,
	History,
	window
) {

	return Flight.defineComponent(function Pjax () {

		this.defaultAttrs({
			pjaxEnabled: 'a[data-pjax]',
			view: '.view'
		});

		this._pjaxGet = function (evt, bag) {
			evt.preventDefault();
			evt.stopPropagation();

			var setting = this._getSettings(bag.el);

			$.ajax(setting)
				.done(this._handlePjaxDone.bind(this, setting.url))
				.fail(this._handlePjaxFail.bind(this, setting.url));
		};

		this._getSettings = function (el) {
			return {
				type: 'GET',
				url: el.pathname,
				dataType: 'json',
				headers: {
					'X-PJAX': true
				}
			};
		};

		this._handlePjaxDone = function(url, data) {
			History.pushState(data, data.title, url);
		};

		this._updateView = function (data) {
			this.trigger('title:changed', { title: data.title });
			this.trigger('breadcrumb:changed', { breadcrumb: data.breadcrumb });

			var pageComponent = $('#page-component').val();
			var pageComponentRef = require(pageComponent);
			pageComponentRef.teardownAll();

			this.select('view').html(data.view.content);

			require([
				data.view.component
			], function (
				Component
			) {
				Component.attachTo('.view');
			});
		};

		this._handlePjaxFail = function(url, jqXHR, textStatus, errorThrown) {
			alert("error, set window.document.location.href to faild url");
		};

		this.after('initialize', function() {
			if (History.enabled) {
				this.on('click', {
					pjaxEnabled: this._pjaxGet
				});

				History.Adapter.bind(window, 'statechange', function () {
					var state = History.getState();
					console.log('statechange', state.data, state.title, state.url);

					if (Object.keys(state.data).length === 0) {
						// Change to replaceState
						window.document.location.href = state.url;
					}

					this._updateView(state.data);
				}.bind(this));
			}
		});

	});

});