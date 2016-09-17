define(function(require, exports, module){
	var changemenu = require('./menu-change');
	var layer = require('./layer');
	var datamatch = require('./data-match');
	var msg = require('./msgbox');

	//main-view 
		$(function() {
			
			//view 页
			$('.view-next').on('click', function() {
				$('.container-main').children().css('display',"none");
				$('.main-report').css('display', 'block');
				changemenu(3);
			});
			//布局隐藏显示
			var clickFlag = false;
			var layershow = function() {
				if(!clickFlag) {
					$('.layer').animate({'right': '2'}, 600);
					clickFlag = true;
					$('.button-hide').children('.arrow-left').addClass('arrow-right');
				} else {
					$('.layer').animate({'right': '-200px'}, 600);
					clickFlag = false;
					$('.button-hide').children('.arrow-left').removeClass('arrow-right');
				}
			};
			$('.button-layer').on('click', layershow);
			$('.button-hide').on('click', layershow);
			// view laylist click
			$('.layer-lists').on('click', '.layer-list', function() {
				var index = $(this).data('layer');
				//alert(index);
				var session = window.sessionStorage;
				var current = JSON.parse(session.getItem('current'));
				if(datamatch(current, index)){
					current.type = index;
					session.setItem('current', JSON.stringify(current));
					layer($('.view-area'), current, index, false);
				}
			});
			//report box
			$('.report-area').on('click', '.img-box', function() {
				$(this).parent().find('.img-input').click();
			});
			//左侧 收起
			$('.button-hidden').on('click', function() {
				$('.container-lists').animate({'left': '-150px'}, 600);
				$('.container-area').animate({'margin-left': '54px'}, 600);
				$(this).addClass('button-show');
				$(this).text('显示');
			});
			$('.button-layercache').on('click', function(event) {
				//event.preventDefault();
				/* Act on the event */
				var session = window.sessionStorage;
				current = JSON.parse(session.getItem('current'));
				//console.log(current);
				var local = window.localStorage;
				var layercache = JSON.parse(local.getItem('layercache')) || [];
				layercache.push({data: current, layer: current.type});
				local.setItem('layercache', JSON.stringify(layercache));
				msg.promp('视图缓存成功');

//				window.setTimeout(function () {
//					window.location.href='view';
//				}, 1500);
			});// click end
			
		})
})