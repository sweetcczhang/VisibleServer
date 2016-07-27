define(function(require, exports, module) {
	require('../util/china');
	var imgdown = require('../imgdown');
	
	var drawMap = function(main, mapData) {
		var geoCoordMap = require('../location')

		var convertData = function (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var geoCoord = geoCoordMap[data[i].name];
		        if (geoCoord) {
		            res.push(geoCoord.concat(data[i].value));
		        }
		    }
		    return res;
		};

		var option = {
		    title: {
		        text: mapData.title,
		        subtext: '',
		        left: 'center',
		        textStyle: {
		            color: '#fff'
		        }
		    },
		    backgroundColor: '#404a59',
		    visualMap: {
		        min: 0,
		        max: 500,
		        splitNumber: 5,
		        inRange: {
		            color: ['#d94e5d','#eac736','#50a3ba'].reverse()
		        },
		        textStyle: {
		            color: '#fff'
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
		                borderColor: '#111'
		            },
		            emphasis: {
		                areaColor: '#2a333d'
		            }
		        }
		    },
		    series: [{
		        name: 'AQI',
		        type: 'heatmap',
		        coordinateSystem: 'geo',
		        data: convertData([
		            {name: "桂林", value: 59},
		            {name: "张家界", value: 59},
		            {name: "宜兴", value: 59},
		            {name: "北海", value: 60},
		            {name: "西安", value: 61},
		            {name: "金坛", value: 62},
		            {name: "东营", value: 62},
		            {name: "牡丹江", value: 63},
		            {name: "遵义", value: 63},
		            {name: "绍兴", value: 63},
		            {name: "扬州", value: 64},
		            {name: "常州", value: 64},
		            {name: "潍坊", value: 65},
		            {name: "重庆", value: 66},
		            {name: "台州", value: 67},
		            {name: "南京", value: 67},
		            {name: "滨州", value: 70},
		            {name: "贵阳", value: 71},
		            {name: "无锡", value: 71}
		           
		        ])
		    }]
		};
		var chart = echarts.init(main);
		chart.setOption(option, true);
	}
	module.exports = drawMap;
});