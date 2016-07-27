define(function(require, exports, module) {
	require('./ajaxfileupLoad');
	require('saveSvgAsPng');
	var imgdown = {
		'canvasAsPng': function(chart){
			
			$('.button-imgdown').on('click', function() {
				$(this).find('span').text('右击视图');
			});
			$('.button-imgdown').on('mouseleave',function(){
				$(this).find('span').text('图片下载');
			});
		},
		'svgAsPng': function() {
			$('.button-imgdown').on('click', function() {
				$(this).find('span').text('右击视图');
			});
			$('.button-imgdown').on('mouseleave',function(){
				$(this).find('span').text('图片下载');
			});
			
			
		}

	};
	

	module.exports = imgdown;
});