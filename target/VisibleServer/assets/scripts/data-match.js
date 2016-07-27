define(function(require, exports, module) {
	require('../css/popup.css');
	var datamatch = function(data, index) {

		// relationtype 数据类型，index 布局类型
		// relationtype 1 yiwei 2 2wei  3 duowei 4 shijian 5 cengci 6 wangluo 7 map 8 zi
		// index 1 Bar  2: Line 3: Pie 4: Timeline 5 Parallel 6: Tree 7: Ford 8: map 9:Word
		relationtype = parseInt(data.relationtype);
		index = parseInt(index);
		//console.log(relationtype+ '' +index);
		if(relationtype === 3 && index !== 5) {
			createPop();
			return false;
		}
		if(index === 4 && data.property.length >1){
			createPop();
			return false;
		}
		if(relationtype === 5 && index !== 6){//cengcii
			createPop();
			return false;
		}
		if(relationtype === 6 && index !== 7){//wangluo
			createPop();
			return false;
		}
		if(index === 6 && relationtype !== 5) {
			createPop();
			return false;
		}
		if(index === 7 && relationtype !== 6) {
			createPop();
			return false;
		}
		if(index === 9 || relationtype === 8) {//wenben
			if(relationtype === 8 && index === 9 ) return true;
			else {
				createPop();
				return false;
			}
			
		}
		if(index === 8 || relationtype === 7) { // map
			if(relationtype === 7 && index === 8) return true;
			else {
				createPop();
				return false;
			}
		}
		return true;
		
		function createPop(){
			var pop = '<div class="popup">\
						<span class="popup-info">数据类型与布局不匹配</span>\
						<div class="popup-close"></div>\
					   </div>';
			$('body').append(pop);
			$('body').on('click', '.popup-close', function() {
				$('.popup').remove();
			});
			setTimeout(function(){
				$('.popup').remove();
			}, 5000);
		}
	}
	module.exports = datamatch;
});