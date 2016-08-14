define(function(require, exports, module) {
	var imgdown = require('../imgdown');
	
	//时间线
	var drawTimeLine = function drawTimeline(main, timeData){
			var series = timeData.series.map(function(item,index) {
				item.type = 'line';
				item.smooth = true;
				item.symbol = 'none';
				item.sampling = 'average';//折线图在数据量远大于像素点时候的降采样策略
		    	return item;
		    });
			var option = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    title: {
			        left: 'center',
			        text: timeData.title,
			    },
			    toolbox: {
			        show: true,
			        feature: {
			            dataView: {show: true, readOnly: false},
			            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
			            restore: {show: true},
			            saveAsImage: {show: true}
			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: timeData.property
			    },
			    yAxis: {
			        type: 'value',
			        boundaryGap: [0, '50%']
			    },
			    dataZoom: [{
			        type: 'inside',
			        start: 0,
			        end: 10
			    }, {
			        start: 0,
			        end: 10
			    }],
			    series: series
			};
			var myChart = echarts.init(main);
			myChart.setOption(option,true);
			
			imgdown.canvasAsPng(myChart);
	}
	module.exports = drawTimeLine;
});