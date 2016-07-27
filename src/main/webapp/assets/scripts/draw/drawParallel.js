define(function(require, exports, module) {
	var imgdown = require('../imgdown');
	
	var drawParallel = function(main, paraData){
		// Schema:
		// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
		var lineStyle = {
		    normal: {
		        width: 1,
		        opacity: 0.5
		    }
		};
		require('echarts');
		var series = paraData.objects.map(function(item, index){
				return 	{
				            name: item,
				            type: 'parallel',
				            lineStyle: lineStyle,
				            data: paraData.relations[item]
				        };
		});
		//console.log(series);
		var schema = paraData.property.map(function(item, index) {
			return { 'name': item, 'index':index, 'text':item};
		});
		var axis = paraData.property.map(function(item, index) {
			return {dim: index, name: item};
		});
		//console.log(axis);

		var option = {
		    backgroundColor: '#333',
		    legend: {
		        bottom: 30,
		        data: paraData.objects,
		        itemGap: 20,
		        textStyle: {
		            color: '#fff',
		            fontSize: 14
		        }
		    },
		    tooltip: {
		        padding: 10,
		        backgroundColor: '#222',
		        borderColor: '#777',
		        borderWidth: 1
		    },
		    // dataZoom: {
		    //     show: true,
		    //     orient: 'vertical',
		    //     parallelAxisIndex: [0]
		    // },
		    parallelAxis:axis,
		    visualMap: {
		        show: true,
		        min: 0,
		        max: 150,
		        dimension: 2,
		        inRange: {
		            color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
		            // colorAlpha: [0, 1]
		        }
		    },
		    parallel: {
		        left: '5%',
		        right: '18%',
		        bottom: 100,
		        parallelAxisDefault: {
		            type: 'value',
		            name: '',
		            nameLocation: 'end',
		            nameGap: 20,
		            nameTextStyle: {
		                color: '#fff',
		                fontSize: 12
		            },
		            axisLine: {
		                lineStyle: {
		                    color: '#aaa'
		                }
		            },
		            axisTick: {
		                lineStyle: {
		                    color: '#777'
		                }
		            },
		            splitLine: {
		                show: false
		            },
		            axisLabel: {
		                textStyle: {
		                    color: '#fff'
		                }
		            }
		        }
		    },
		    series: series
		};
		var chart = echarts.init(main);
		chart.setOption(option, true);
		imgdown.canvasAsPng(chart);
	}
	module.exports = drawParallel;
});