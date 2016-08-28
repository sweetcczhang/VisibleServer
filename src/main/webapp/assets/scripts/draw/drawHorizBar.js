/**
 * Created by cuidanyang on 16/8/14.
 */
define(function(require, exports, module) {
    require("echarts");
    require("jquery");
    var imgdown = require('../imgdown');

    var drawHorizBar = function(main, barData) {
        // console.log(barData);
        var series = barData.series.map(function(item,index) {
            item.type = 'bar';
            return item;
        });
        var chart = echarts.init(main);
        var option = {
            title: {
                text: barData.title,
                x: 'center',
                y: 'top',
                textStyle: {
			    	color: '#fff'
			    }
            },
            backgroundColor: '#2c343c',
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                textStyle: {
			    	color: '#fff'
			    }
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'top',
                data: barData.objects,
                textStyle: {
			    	color: '#fff'
			    }
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'top',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'stack', 'tiled', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'value',
                    name: ' ',
                    nameGap: 3,
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
            yAxis: [
                {
                    type: 'category',
                    data: barData.property,
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
            series: series
        };
        chart.setOption(option, true);

        return chart;
    }
    module.exports = drawHorizBar;
})