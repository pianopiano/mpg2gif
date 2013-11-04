/**
 * Module dependencies.
 */

var express = module.exports = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var routes = {
	index  : require('./routes/index'),
	upload : require('./routes/upload'),
	build :  require('./routes/build')
};
var share = require('./public/javascripts/share');
share.videoPath = '';
share.gifPath = '';
share.build = false;
share.fix = false;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  //app.use(express.bodyParser());
  app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.bodyParser({buildDir:'./build'}));
  app.use(express.methodOverride());	
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index.index);
app.post('/upload', routes.upload.get);
app.post('/build', routes.build.get);
app.post('/set', function(req, res){
	if(req.method=='POST') {
		var body = req.body;
		if (body.videoPath!==undefined) share.videoPath = body.videoPath;
		if (body.gifPath!==undefined) share.gifPath = body.gifPath;
		if (body.build!==undefined) share.build = body.build;
		if (body.fix!==undefined) share.fix = body.fix;
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
