var share = require('../public/javascripts/share')

exports.index = function(req, res){
	if (share.fix===true) {
		share.videoPath = '';
		res.render('index', { title: 'mpg2gif', videoPath: share.videoPath, gifPath: share.gifPath});
		share.fix = false;
		return false;
	} else {
		res.render('index', { title: 'mpg2gif', videoPath: share.videoPath, gifPath: '' });
		return false;
	}
};
