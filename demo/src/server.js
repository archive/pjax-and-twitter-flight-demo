var express = require('express');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');

var app = express();

app.engine('ejs', engine);

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

var _render = function (req, res, page, options) {
	options.pageComponent = page;
	if (req.header('X-PJAX')) {
		_pjaxRender(req, res, page, options);
	} else {
		res.render(page, options);
	}
};

var _getRenderOptions = function (title, breadcrumb, pageComponent) {
	return {
		title: 'product-catalog.com - ' + title,
		breadcrumb: breadcrumb,
		now: new Date().toLocaleTimeString()
	};
};

var _pjaxRender = function (req, res, page, options) {
	options.layout = function () {};
	app.render(page, options, function(err, html) {

		var view = html.replace(/(\n|\t)/g, '');
		view = view.replace(/"/g, '\"');

		var data = {
			title: options.title,
			view: {
				component: page,
				content: view
			},
			breadcrumb: options.breadcrumb
		};
		res.json(data);

	});
};

app.get('/product/:name', function (req, res) {
	var name = req.params.name;
	var page = 'product ' + name;
	var breadcrumb = '> list > ' + page ;
	var options = _getRenderOptions(page, breadcrumb);
	options.productName = 'Product ' + name;
	_render(req, res, 'product', options);
});

app.get('/:page', function (req, res) {
	var page = req.params.page;
	var breadcrumb = '> ' + page;
	var options = _getRenderOptions(page, breadcrumb);
	_render(req, res, page, options);
});

app.get('/', function (req, res) {
	var page = 'list';
	var breadcrumb = '> ' + page;
	var options = _getRenderOptions(page, breadcrumb);
	_render(req, res, page, options);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
