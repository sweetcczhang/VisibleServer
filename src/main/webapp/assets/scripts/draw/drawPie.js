define(function(require, exports, module) {
	require("jquery");
	require("echarts");
	var imgdown = require('../imgdown');
	
	var drawPie = function(main, pieData){

		console.log(pieData);
		//var series = pieData.relations[pieData.objects][0].map(function(item, index){ return {name: pieData.property[index], value: item}  });
		//console.log(series);
		var chart = echarts.init(main);
		var option = {
		    title : {
		        text: pieData.title,
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/> {b} : ({c}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        y:'top',
		        data: pieData.property
		    },
		    toolbox: {
		        show : true,
		        orient:'vertical',
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true, 
		                type: ['pie']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
	   	 	calculable : true,
	    	series : [
		        {
		            name:pieData.title,
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:pieData.series
		        }
	    	]
		};
   		chart.setOption(option, true); 
   		
   		imgdown.canvasAsPng(chart);
   		
    	return chart;
	}
	
	module.exports = drawPie;
});