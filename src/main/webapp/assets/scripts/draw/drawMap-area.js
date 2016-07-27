define(function(require, exports, module) {
	var load = require('../loadAPI');
	//console.log(load);
	var model = require('../model');
	var imgdown = require('../imgdown');
	//console.log(imgdown);
	var mapArea = function(main , areaData){
		var min = [];
		var max = [];
		var series = areaData.objects.map(function(elem, index ){
			//alert(index,elem);
			var oj = {
					name: elem,
					type: 'map',
		            mapType: 'china',
		            roam: false,
		            coordinateSystem: 'geo',
		            label: {
		                normal: {
		                	areaColor: '#323c48',
		                    show: true
		                },
		                emphasis: {
		                	areaColor: '#2a333d',
		                    show: true
		                }
					},
		            data:areaData.relations[elem].map(function(elem, index) {
		            	min.push(elem[1]);
						return {name: elem[0], value: elem[1]};
					})
			};
			Array.prototype.push.apply(max,min);
			return oj;
		});
		var arr = max.sort(function(a, b){
			return a-b;
		});
		
		min = parseInt(arr[0]);
		max = parseInt(arr[max.length - 1]);
		console.log(max,min,series);
		var option = {
		    title: {
		        text: areaData.title,
		        left: 'center',
		        textStyle: {
			    	color: '#fff'
			    },
		    },
		    
		    backgroundColor: '#404a59',
		    tooltip: {
		        trigger: 'item'
		        
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data:areaData.objects,
		        textStyle: {
			    	color: '#fff'
			    }
		    },
		    visualMap: {
		    	type: 'continuous',
		        min: min,
		        max: max,
		        left: 'left',
		        top: 'bottom',          // 文本，默认为数值文本
		        calculable: true,
		        color: ['#d94e5d','#eac736','#50a3ba'],
		        textStyle: {
			    	color: '#fff'
			    }
		    },
		    toolbox: {
		        show: true,
		        orient: 'vertical',
		        left: 'right',
		        top: 'center',
		        feature: {
		            dataView: {readOnly: false},
		            restore: {}
		        }
		    },
		    geo: {
		        map: 'china',
		        label: {
		            emphasis: {
		                show: false
		            }
		        },
		        roam: true,
		        itemStyle: {
		            normal: {
		                areaColor: '#323c48',
		                borderColor: '#404a59'
		            },
		            emphasis: {
		                areaColor: '#2a333d'
		            }
		        }
		    },
		    series: series
		};
		var chart = echarts.init(main);
		chart.setOption(option, true);

		var session = window.sessionStorage;
		var api = session.getItem('api');
		var fresh = session.getItem('fresh');
		//alert(fresh);
		if(fresh != 'false') {
			setInterval(function(){
				load(api, function(data){
					console.log(data);
					areaData = model.change(data, 8);
					min = [];
					max = [];
					series = areaData.objects.map(function(elem, index ){
						oj = {
								name: elem,
								type: 'map',
					            mapType: 'china',
					            roam: false,
					            coordinateSystem: 'geo',
					            label: {
					                normal: {
					                	areaColor: '#323c48',
					                    show: true
					                },
					                emphasis: {
					                	areaColor: '#2a333d',
					                    show: true
					                }
					            },
					            data:areaData.relations[elem].map(function(elem, index) {
					            	min.push(elem[1]);
									return {name: elem[0], value: elem[1]};
								})
						};
						Array.prototype.push.apply(max,min);
						return oj;
				});
				arr = max.sort(function(a, b){
					return a-b;
				});
		
				min = parseInt(arr[0]);
				max = parseInt(arr[max.length - 1]);
				option.visualMap.min = min;
				option.visualMap.max = max;
	    		option.series = series;
	    		//console.log(series);
	    		chart.setOption(option,true);
			});
			},5000);
			
		}
            


		imgdown.canvasAsPng(chart);

	}
	module.exports = mapArea;
})