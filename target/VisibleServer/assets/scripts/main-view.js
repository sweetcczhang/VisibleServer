define(function(require, exports, module){
	var changemenu = require('./menu-change');
	var layer = require('./layer');
	var datamatch = require('./data-match');
	var msg = require('./msgbox');
	var session = window.sessionStorage;
	var current = JSON.parse(session.getItem('current'));
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
				if(datamatch(current, index)){
					current.type = value;
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
				current = JSON.parse(session.getItem('current'));
				console.log(current);
				var api = 'upload_data';
				type = current.type;
				$.ajax({
			 		type:'post',
			 		url: api,
			 		async: true,
			 		data: {'data': JSON.stringify(current), 'id':1, 'type': type},
			 		dataType:"json",
			 		jsonp: 'callback',
			 		crossDomain:true,
			 		success:function (data) {
			 			console.log(data);
			 			msg.promp('视图缓存成功');
			 			setTimeout(function(){
			 				window.location.href='view';
			 			},2000);
			 		},
			 		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 			console.log(XMLHttpRequest.status);
			 			msg.promp('视图缓存出现问题，请重试');
		            }
			 	});//ajax end
				
				
			});// click end
			
		})
})