define(function(require, exports, module) {
	var load = require('../loadAPI');
	//console.log(load);
	var model = require('../model');
	var imgdown = require('../imgdown');
	
	//时间线
	var drawTimeLineD = function drawTimeline(main, timeData){
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
			        textStyle: {
				    	color: '#fff'
				    }
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
			        data: timeData.property,
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
			    },
			    yAxis: {
			        type: 'value',
			        boundaryGap: [0, '50%'],
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
			    },
			    dataZoom: [{
			        type: 'inside',
			        start: 0,
			        end: 100
			    }, {
			        start: 0,
			        end: 100
			    }],
			    series: series
			};
			var myChart = echarts.init(main);
			myChart.setOption(option,true);
			var session = window.sessionStorage;
			var api = session.getItem('api');
			
            setInterval(function(){
				load(api, function(data){
					timeData = model.change(data, 4);
					var s = timeData.objects.map(function(item,index) {
				    	return {
				    			 name: item, 
				    			type:'line', 
				    			smooth: true, 
				    			symbol: 'none', 
				    			sampling: 'average',//折线图在数据量远大于像素点时候的降采样策略
				    			data:timeData.relations[item][0]
				    		};
		    		});
		    		option.series = s;
		    		console.log(series);
		    		myChart.setOption(option,true);
				});
			},1000);
            
            imgdown.canvasAsPng(myChart);
	}
	module.exports = drawTimeLineD;
});