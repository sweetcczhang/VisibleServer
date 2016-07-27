define(function(require, exports, module) {
	var changemenu = require('./menu-change');
	var layer = require('./layer');
	var datamatch = require('./data-match');
	var session = window.sessionStorage;
	
	//main-table 模块操作
		$(function() {
			//table next
			$('.table-next').on('click', function() {
				var current = JSON.parse(session.getItem('current'));
				var fresh = session.getItem('fresh');
				console.log(current);
				var value = $('.select-layer').find('option:selected').val();
				if(datamatch(current, value)){
					$('.container-main').children().css('display',"none");
					$('.main-view').css('display', 'block');
					//console.log( typeof $.data(cache, 'refresh'));
					layer($('.view-area'),current, value, fresh);
					current.type = value;
					session.setItem('current', JSON.stringify(current));
					changemenu(2);
				}
				
			});
		});
})