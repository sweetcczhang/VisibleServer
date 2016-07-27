define(function(require, exports, module) {
	require("echarts");
	require("jquery");
	var imgdown = require('../imgdown');
	
	var drawLine = function(main,lineData) {
		console.log(lineData);
	var series = lineData.objects.map(function(item,index) {
	    	return {name: item, type:'line', smooth: true, data:lineData.relations[item][0]};
	    });
	var chart = echarts.init(main);
	var option = {
	    title : {
	        text: lineData.title,
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
		        data: lineData.objects
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
	            boundaryGap : false,
	            data : lineData.property
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:' ',
	            nameGap:3,
	            axisLabel : {
	                formatter: '{value}'
	            }
	        }
	    ],
	    series :series
	};
	chart.setOption(option, true); 
	imgdown.canvasAsPng(chart);
	return chart;
	}
	
	module.exports = drawLine;
});