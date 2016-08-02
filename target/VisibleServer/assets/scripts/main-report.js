define(function(require, exports, module){
	require('../css/visual-report.css');
	$(function() {
		var edit = '<div class="edit-chart">'
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
		 $().on('click', '.btn-add', function() {

	     });
	     $('.popup-report').on('click', '.btn-cancel , .popup-cl', function() {
		        $('.popup-report').css('display', 'none');
	     });
		$('.edit-addchart').on('click', function() {
			$(this).before(edit);
		});
	})
})