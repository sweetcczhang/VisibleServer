/**
 * Created by dany on 2016/7/31.
 */
define(function(require, exports, module) {
    require('jquery');
    require('./bootstrap/bootstrap.min.css');
    require('./DVL.js');
    require('echarts');
    require('../css/header.css');
    require('../css/visual-index.css');
    require('../css/developer.css');
    $(function() {
        var main = document.getElementById('main');
        var data = {
			"describe":"时间流量统计",
			"title":"时间流量统计",
			"objects":["淘宝用户"],
			"property":[["时间段","流量"]],
			"relationtype":4,
			"relations":{"淘宝用户":[[1, 3193], [2, 2936], [3, 1882], [4, 1893], [5, 1462], [6, 2810], [7, 6732], [8, 7470], [9, 16632], [10, 27254], [11, 28019], [12, 22762], [13, 18991], [14, 16985], [15, 12535], [16, 14797], [17, 13062], [18, 9446], [19, 8081], [20, 9291], [21, 9954], [22, 11835], [23, 10785], [24, 3182]]}
			};
		DVL.line(main, data);
    })
})