define(function(require, exports, module) {
	require('jquery');
	require('echarts');
	require('d3');
	

		require('./bootstrap/bootstrap.min.css');
		require('../css/header.css');
		require('../css/visual-view.css');

		require('bootstrap');
		
		var table = require('./table');
		var layer = require('./layer');

		var source ;//= $.data('cache');
		source = require('sourcedataexample');
		var current = '';
		(function load(){
			//alert(source)
			var api = 'get_data';
			$.ajax({
		 		type:'post',
		 		url: api,
		 		async: true,
		 		data: {'id':1},
		 		dataType:"json",
		 		jsonp: 'callback',
		 		crossDomain:true,
		 		success:function (data) {
		 			console.log(JSON.stringify(data));
		 			data = data.DATA;
		 			var list = '' ;
		 			source = data;
		 			current = data[0];
					for( var item in data){
						list +='<li class = "datalist" data-value = '+ item +'>'+data[item].title+'</li>';
					}
					$('.datalists').html(list);
					$('.datalists li').eq(0).trigger('click');
		 		},
		 		error: function(XMLHttpRequest, textStatus, errorThrown) {
		 			console.log(XMLHttpRequest.status);
	            }
		 	});
			
		}())

	$(function(){
		$('.datadisplay-choose').on('click', 'li.tablist', function() {
			var index = $(this).index();
			console.log(current);
			if(index === 0){
				$('.datadisplay-table').css('display',"block");
				$('.datadisplay-view').css('display',"none");

				table('.datadisplay-table', current, false);
			} else {
				$('.datadisplay-view').css('display',"block");
				$('.datadisplay-table').css('display',"none");
				
				layer($('.datadisplay-view'), current, current.type, false );
				
				
			}
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
		});
		$('.datalists').on('click', '.datalist', function() {
			var name = $(this).data('value');
			current = source[name];
			$('.datadisplay-choose li').eq(0).trigger('click');
			table('.datadisplay-table', current, false);
		});
		
	});
});