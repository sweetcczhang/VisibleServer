define(function(require, exports, module) {
	var source = require('./sourcedataexample');
	//var data2 = source.sourceData2; 
	var load = function(api, fn){
		//console.log(1);
		$.ajax({
			 		type:'get',
			 		//http://10.108.215.140:8888/springmvc/view/viewaction
			 		//http://localhost:8080/springmvcdemo/rest/user/gethbasedata?type=1
			 		url: api,
			 		async: true,
			 		data: '',
			 		dataType:"json",
			 		jsonp: 'callback',
			 		crossDomain:true,
			 		success:function (data) {
			 			if(typeof fn === 'function') fn(data) ;
			 		},
			 		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 					//console.log(data);
		                          console.log(XMLHttpRequest.status);
		                         //  alert(XMLHttpRequest.readyState);
		                         //  alert(textStatus);
		            }
			 	});
	}
	module.exports = load;
});