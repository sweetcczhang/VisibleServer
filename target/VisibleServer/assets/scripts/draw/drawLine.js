define(function(require, exports, module) {
	require("echarts");
	require("jquery");
	var imgdown = require('../imgdown');
	
	var drawLine = function(main,lineData) {
		console.log(lineData);
		var series = lineData.series.map(function(item,index) {
			item.type = 'line';
			item.smooth = true;
			return item;
		});
	var chart = echarts.init(main);
	var option = {
	    title : {
	        text: lineData.title,
	        x:'center',
	        y:'top',
	        textStyle: {
		    	color: '#fff'
		    }
	    },
	    backgroundColor: '#2c343c',
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
       		},
       		textStyle: {
    	    	color: '#fff'
    	    },
	    },
	    legend: {
		        orient : 'vertical',
		        x : 'left',
		        y:'top',
		        data: lineData.objects,
		        textStyle: {
			    	color: '#fff'
			    },
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
	            data : lineData.property,
	            axisLine: {
	                lineStyle: {
	                    color: '#fff'
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#fff'
	                }
	            },
	            axisTick: {
	                lineStyle: {
	                    color: '#fff'
	                }
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:' ',
	            nameGap:3,
	            axisLabel : {
	                formatter: '{value}'
	            },
	            axisLine: {
	                lineStyle: {
	                    color: '#fff'
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#fff'
	                }
	            },
	            axisTick: {
	                lineStyle: {
	                    color: '#fff'
	                }
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