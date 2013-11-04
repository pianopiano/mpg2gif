$(function(){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
		console.log('isSupported');
	} else {
		alert('The File APIs are not fully supported in this browser.');
		return false;
	}
	
	var filepath = '';
	var gifPath = $('#gif').text();
	var handlIndex = 0;
	var videoParams = {
		w: 320,
		h: 240
	}
	var format = [
		'mp4',
		'mov',
		'm4v'
	];
	
	var addEvents = function() {
		$('#file').on('change', function(){
			var filename = $(this).val();
			var arr = filename.split('.');
			var flag = false;
			var player = null;
			for (var i = 0; i < format.length; i++) {
				if (arr[arr.length-1]===format[i]) flag = true;
			}
			if (flag===false) {
				alert('format...mp4、mov、m4v');
			} else {
				$('#submit1').show();
			}
			return;
		});
	}
	
	var initSlider = function(min, max){
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: max,
			values: [ 0, max ],
			step: 0.01,
			slide: function( event, ui ) {
				seek(ui.values[0], ui.values[1]);
			}
		});
		$('.ui-slider-handle').on('mouseenter', function(){
			handlIndex = $('.ui-slider-handle').index(this);
		})
	}
	
	function seek(a, b) {
		if (video===null) return;
		if (handlIndex===0) {
			player.currentTime = a;
			$('#start').val(a)
		} else if (handlIndex===1) {
			player.currentTime = b;
			$('#end').val(b)
		}
	}
	
	
	var setUpVideo = function() {
		filepath = $('#video').text().split('./public')[1];
		$('#video').text(filepath.split('images/')[1])
		.after(
			'<video id="player" src="'+ filepath +'" width="'+videoParams.w+'"></video><br />'+
			'<div id="slider-range"></div>'
		);
		player = document.getElementById('player');
		player.addEventListener('loadedmetadata', function(e) {
			initSlider(player.currentTime, player.duration);
			$('#start').val(player.currentTime);
			$('#end').val(player.duration);
		}, true);
		
		$('#build').show();
		$('#content').empty().remove();
		
		$.post('/set', {build: true});
	}
	
	var setFix = function(){
		$('#content, #build, #video, #player, #gif').empty().remove();
		$('#container').append('<div id="generation"><img src="'+ gifPath +'" /></div>');
		$.post('/set', {videoPath: '',gifPath: '', build: false, fix: false});
	}
		
	var init = function() {
		if ($('#video').text()!==''){
			setUpVideo();
			return;
		}
		if ($('#gif').text()!=='') {
			setFix();
			return;
		}
		
		addEvents()
	}
	init();
});
