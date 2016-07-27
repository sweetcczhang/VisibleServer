define(function(require, exports, module) {
	require('../css/popup.css');
	
	var msg={
			'promp':function(value){
				var pop = '<div class="popup">\
							<span class="popup-info">'+ value + '</span>\
							<div class="popup-close"></div>\
						   </div>';
				$('body').append(pop);
				$('body').on('click', '.popup-close', function() {
					$('.popup').remove();
				});
				setTimeout(function(){
					$('.popup').remove();
				}, 2000);
			}
	}	
		
	
	module.exports = msg;
});