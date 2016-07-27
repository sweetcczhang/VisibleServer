define(function(require, exports, module) {
		//主菜单操作
		$(function() {
			// 可视化分析menu定位
			$('.container-menu').on('click', '.menulist', function() {
				var $this = $(this);
				var index = parseInt($this.data('index'), 10);
				$('.container-main').children().css('display',"none");
				$('.container-main').children().eq(index-1).css('display',"block");
				changemenu($(this).index());
			})
		})
		//menu change
		var changemenu = function (num) {
				
				$('.menulists').children().each(function(){
					$(this).removeClass('active')
					if($(this).index() === num) $(this).addClass('active');
				});
		}

	module.exports = changemenu;
})