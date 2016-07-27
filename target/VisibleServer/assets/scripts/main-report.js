define(function(require, exports, module){
	$(function() {
		 $('.report-edit').on('click', '.chart-con-add', function() {
		        $('.popup').css('display', 'block');
	     });
		 $().on('click', '.btn-add', function() {

	     });
	     $('.popup').on('click', '.btn-cancel , .popup-cl', function() {
		        $('.popup').css('display', 'none');
	     });
	})
})