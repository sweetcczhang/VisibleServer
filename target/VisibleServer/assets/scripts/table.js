define(function(require, exports, module) {
	var model = require('./model');
	var load = require('./loadAPI')
	var drawtable = function(data) {
		//表格显示
	if(data){
		if(data.relationtype === 5){
			var html, tr, chd, trCh;
			var oj = '';
			html = '<table class="table table-default">'+
				'<tr><td>' + data.relations.name+ '</td>';
				chd = data.relations.children;
				trCh='';
				if(chd.length > 0) {
					for( var i = 0; i < chd.length; i++ ) {
						trCh += '<tr><td>'+ chd[i].name +'</td>';
						trCh += '<td>children:'+ JSON.stringify(chd[i].children) +'</td></tr>';
					}
					
				}
				html += trCh + '</table>';

				return html;
		}
		if(data.relationtype === 6){
			var html = '<table class="table">'
				var tr ='<tr><td>source</td><td>target</td></tr>';
				data.relations.map(function(item,index) {
					tr +='<tr><td>' + item.source +'</td><td>' + item.target.toString() +'</td></tr>';
				});
				html += tr +'</table>';
				return html;
		}
		if(data.relationtype === 4 ) {
			data = model.timeData(data);
			console.log(data);
			html='<table class="table table-bordered ">'+
			'<caption>title:'+data.title+'</caption>'+
			'<caption>describe:'+data.describe+'</caption>'+
			'<caption>relationtype:'+data.relationtype+'</caption>';
			oj = '<tr><td>objects</td>';
			for( var i = 0; i < data.objects.length; i++) {
				oj +='<td>' +  data.objects[i] + '</td>';
			}
			oj += '</tr>';
			for(var i = 0; i < data.property.length; i++) {
				var tb = '<tr><td>' + data.property[i] + '</td>';
				for( var j = 0; j < data.objects.length; j++) {
					tb +='<td>' + data.relations[data.objects[j]][0][i] + '</td>';
				}
				oj += tb + '</tr>' ;
			}

			html += oj +'</table>';
			return html;
		}
		html='<table class="table table-bordered ">'+
		'<caption>'+data.title+'</caption>'+
		'<caption>describe:'+data.describe+'</caption>'+
		'<caption>relationtype:'+data.relationtype+'</caption>';
		
		if(data.property.length === 1) {
			oj = '<tr><td>objects</td>';
			for( var i = 0; i < data.property[0].length; i++) {
				oj +='<td>' +  data.property[0][i] + '</td>';
			}
			oj += '</tr>';
			for(var i = 0; i < data.objects.length; i++) {
				var tb = '';
				for( var j = 0; j < data.relations[data.objects[i]].length; j++) {
					tb +='<tr><td>' + data.objects[i] + '</td>';
					var t = data.relations[data.objects[i]][j];
					var r = t.map(function(item, index) {
						return '<td>' + item + '</td>' ;
					});
					tb += r.join('') + '</tr>' ;
				}
				oj += tb ;
			}

			html += oj +'</table>';
			return html;

		} else if(data.property.length > 1){

			oj = ''; 
			for( var i = 0; i < data.objects.length ; i++) {
				oj +='<tr><td>' + data.objects[i] +'</td>'+
				'<td><table class="table table-bordered"><tr>' ;
				var p = data.property[i].map(function(item, index) {
					return '<td>' + item +'</td>';
				});
				oj += p.join('') + '</tr>';
				var tb = '';
				for(var j = 0; j < data.relations[data.objects[i]].length; j++) {
					var t = data.relations[data.objects[i]][j];
					var v = t.map(function(item, index) {
						return '<td>' + item + '</td>' ;
					});
					tb += '<tr>' + v.join('') + '</tr>' ;
				}
				oj += tb +'</table></td></tr>';
				
				}
				html += oj+'</table>';
				return html;
			}
		
		}

	};

	var table = function(selector, data, fresh){
		var api, session;
		if(fresh){
			session = window.sessionStorage;
			api = session.getItem('api',api);
			console.log(api,fresh);
			$(selector).html(drawtable(data));
			setInterval(function(){
				load(api, function(data){
					$(selector).html(drawtable(data));
				});
			},10000);

		}else {
			$(selector).html(drawtable(data));
		}
	};
	module.exports = table;
});