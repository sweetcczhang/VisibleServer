define(function(require, exports, module) {
	require("echarts");
	require("jquery");
	var imgdown = require('../imgdown');

	var drawBar = function(main,barData) {
		console.log(barData);
	var series = barData.objects.map(function(item,index) {
	    	return {name: item, type:'bar', data:barData.relations[item][0]};
	    });
	var chart = echarts.init(main);
	var option = {
	    title : {
	        text: barData.title,
	        x:'center',
	        y:'top'
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
       		}
	    },
	    legend: {
		        orient : 'vertical',
		        x : 'left',
		        y:'top',
		        data: barData.objects
		 },
	    toolbox: {
	        show : true,
	        orient:'vertical',
	        x:'right',
	        y:'top',
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {show: true, type: ['line','stack','tiled', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : barData.property
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:' ',
	            nameGap:3
	        }
	    ],
	    series :series
	};
	chart.setOption(option, true); 
	//绑定上传图片
	imgdown.canvasAsPng(chart);

	return chart;
	}
	// var drawBar = {
	// 	'common': draw(main, barData),
	// 	'moreLeng': draw(main, barData)
	// }
	

	module.exports = drawBar;
});