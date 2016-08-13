/**
 * Created by dany on 2016/8/13.
 */
define(function(require,exports,module){
		require('jquery');
		require('d3');
		require('echarts');
//	var source = require('./sourcedataexample');
//	var current = source.sourceData7;	
	
		require('bootstrap');

		require('./bootstrap/bootstrap.min.css');
		require('../css/header.css');
		require('../css/visual-index.css');
	
		
		var session = window.sessionStorage;
		session.setItem("fresh",'false');
		
		require('./main-import');
		require('./main-table');
		require('./main-view');
		require('./main-report');

	
		
		
		
		
		
		
		
		
		
		
	
});