/**
 * Created by dany on 2016/8/13.
 */
define(function(require,exports,module){
		require('jquery');
		require('d3');
		require('echarts');
//	var source = require('./sourcedataexample');
//	var current = source.sourceData7;	
	
		var session = window.sessionStorage;
		session.setItem("fresh",'false');

		require('./bootstrap/bootstrap.min.css');
		require('../css/header.css');
		require('../css/visual-report.css');
		
		require('bootstrap');
	
		var d_template = '<div class="edit-des">
        <div class="des-title">TITLE</div>
        <p class="des-detail">CONTENT</p>
    </div>
    ';
    var c_template = '<div class="edit-chart">
        <div class="chart-title">TITLE</div>
        <div class="chart-con">
            <div class="chart-con-view" id="DATAID"></div>
            <div class="chart-con-des">CONTENT</div>
        </div>
    </div>';
		
		
		
		
		
		
		
		
		
	
});