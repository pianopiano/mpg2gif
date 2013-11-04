var fs = require('fs');
var share = require('../public/javascripts/share');

exports.get = function(req, res){
	var tmp_path = req.files.thumbnail.path;
	share.videoPath = './public/images/' + req.files.thumbnail.name;
	fs.rename(tmp_path, share.videoPath, function(err) {
		if (err) throw err;
		fs.unlink(tmp_path, function() {
			if (err) throw err;
		});
	});
	res.redirect("/");
};