var fs = require('fs');
var share = require('../public/javascripts/share')
var ffmpeg = require('../node_modules/fluent-ffmpeg');
var easyimg = require('../node_modules/easyimage/easyimage');

exports.get = function(req, res){
	var basePath = './public/builds/';
	var dir = new Date().getTime()+'/';
	var src = share.videoPath; 
	var arr = [];
	var start = 0;
	var end = 10;
	var count = 20;
	var width = 320;
	var height = 240;
	var body = req.body;
	
	if (body.start!==null || body.start!==undefined) {
		start = parseInt(body.start);
	}
	if (body.end!==null || body.end!==undefined) {
		end = parseInt(body.end);
	}
	if (body.count!==null || body.count!==undefined||body.count!=='0') {
		count = parseInt(body.count);
		if (body.count>=50) count = 50;
	}
	if (body.width!==null || body.width!==undefined) {
		width = parseInt(body.width);
	}
	
	var size = width+'x?'
	var v = (end - start) / count;
	
	for (var i = 0; i < count; i++) {
		arr.push(((start) + ( v * i )).toString());
	}
	
	var proc = new ffmpeg({ source: src })
		.withSize(size)
		.takeScreenshots({
			count: count,
			timemarks: arr,
			filename: '%00i'
	    }, basePath + dir, function(err, filenames) {
			if(err) throw err;
			convert();
		});
		
	function convert() {	
		easyimg.convert({
			src: basePath + dir + '*.jpg',
			dst: basePath + dir + 'sample.gif',
			quality: 80
		}, function(err, image){
			if (err) throw err;
			share.fix = true;
			share.gifPath = '/builds/' + dir + 'sample.gif';
			fs.unlink(share.videoPath, function(err) {
				if (err) throw err;
			});
			
			res.redirect("/");
		})
	}
};


