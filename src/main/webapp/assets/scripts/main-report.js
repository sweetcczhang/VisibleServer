define(function(require, exports, module){
	require('../css/visual-report.css');
	$(function() {
		var edit = '<div class="edit-chart" id="ID">'
			+'<div class="chart-title">数据图表标题<div class="chart-desicon"></div></div>'
			+'<div class="chart-con">'
			+'<div class="chart-con-add">+</div>'
			+'<div class="chart-con-view">图标图表图表</div>'
			+'<div class="chart-con-des">数据图表标题数据图表标题数据图表标题数据图表标题数据图表标题</div>'
			+'</div>'
			+'</div>';
		 $('.report-edit').on('click', '.chart-con-add', function() {
		        $('.popup-report').css('display', 'block');
	     });
		 $('.popup-btn').on('click', '.btn-add', function() {

	     });
	     $('.popup-report').on('click', '.btn-cancel , .popup-cl', function() {
		        $('.popup-report').css('display', 'none');
	     });
		$('.edit-addchart').on('click', function() {
			var id = (new Date()).getTime();
			var div = edit.replace('ID', id);
			$(this).before(div);
		});
		//弹出框返回上一步
		$('.popup-report').on('click', '.goback', function() {
			$('.data-cache-box').css('display', 'none');
			$('.view-cache-box').css('display', 'none');
			$('.cache-box').css('display', 'block');
		});
		//弹出框选择
		$('.popup-report').on('click', '.data-cache , .view-cache', function() {
			var co = parseInt($(this).data('co'));
			$('.cache-box').css('display', 'none');
			if(co === 1){
				$('.data-cache-box').css('display', 'block');
				loadData();
			} else if(co ===2) {
				$('.view-cache-box').css('display', 'block');
			}
		});
		function loadData() {
			var api = '';
			dataToSend = '';
			$.ajax({
		 		type:'get',
		 		url: api,
		 		async: true,
		 		data: dataToSend,
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
		}
	})
})