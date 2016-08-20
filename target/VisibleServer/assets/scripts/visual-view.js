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
	var local = window.localStorage;
	var layercache = local.getItem('layercache') || [];
	var cacheData = JSON.parse(layercache);
		var current = '';
		(function load(){
			if(cacheData.length > 0) {
				var list = '' ;
				for( var item in cacheData){
					var data = cacheData[item].data || {};
					var type = cacheData[item].layer;
					list +='<li class = "datalist" data-value = '+ item +'>'+data.title+'</li>';
				}
				current = cacheData[0];
				$('.datalists').html(list);
				$('.datalists li.datalist').eq(0).trigger('click');
			}


		}())

	$(function(){
		$('.datadisplay-choose').on('click', 'li.tablist', function() {
			var index = $(this).index();
			console.log(current);
			if(index === 0){
				$('.datadisplay-table').css('display',"block");
				$('.datadisplay-view').css('display',"none");

				table('.datadisplay-table', current.data, false);
			} else {
				$('.datadisplay-view').css('display',"block");
				$('.datadisplay-table').css('display',"none");
				
				layer($('.datadisplay-view'), current.data, current.layer, false );
			}
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
		});
		$('.datalists').on('click', '.datalist', function() {
			var name = $(this).data('value');
			current = cacheData[name];
			$('.datadisplay-choose li').eq(1).trigger('click');
			layer($('.datadisplay-view'), current.data, current.layer, false );
		});
		
	});
});