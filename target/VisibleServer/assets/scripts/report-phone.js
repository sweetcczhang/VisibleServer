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
		require('../css/report-phone.css');
	var model = require('./model');
	var setlayer = require('./draw-report.js');
	var reportid = getQueryString('reportid') || 7;
	(function () {
		var createStyle = function (cssText) {
			var document = window.document;
			var styleTag = document.createElement("style");
			styleTag.setAttribute("type", "text/css");
			styleTag.innerHTML = cssText;
			document.getElementsByTagName("head").item(0).appendChild(styleTag);
		};

		var ua = window.navigator.userAgent;
		var isMobile = ua.match(/(Android|iPhone|iPad)/);
		var width = 750;
		if (isMobile) {
			width = window.screen.width;
			createStyle('html { font-size: ' + width * 12 / 320 + 'px; font-family: "Helvetica"; }');
		} else {
			createStyle('html { font-size: ' + width * 12 / 320 + 'px; font-family: "黑体-简", "Helvetica"; } .page { width: ' + width + 'px; } ');
		}
		loadReport();
	}());



		function loadReport() {
			var api ='../user/getreportbyid';
			//var reportid = '7';
			$.ajax({
				type:'get',
				url: api,
				async: true,
				data: {reportid: reportid},
				dataType:"json",
				jsonp: 'callback',
				crossDomain:true,
				success:function (data) {
					console.log(data);
					addContent.call($('#wrap'), data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest.status);
				}
			});
		}
	function addContent(data){
		var that = this;
		var report = JSON.parse(data.DATA.reportData);
		var desc = report.desc;
		var content = report.content;
		var descHtml = '<div class="page">'+
						'<div class="bg-corner1"><div class="bg-corner2"></div></div>'+
						'<h1 class="page-title">'+desc.title+'</h1>'+
						'<span class="page-des">'+desc.content+'</span>'+
			          '</div>';
		$(that).append(descHtml);
		var conHtml = [];
		for(var i =0; i<content.length;i++){
			var cur = content[i].data;
			var html = '<div class="page">' +
							'<h3 class="content-title">'+cur.title+'</h3>'
							+'<div class="chart-con">'
							+'<div class="content-view" id="view'+cur.viewId+'"></div>'
							+'<span class="content-des">CONTENT'+cur.describe+'</span>'
						+'</div></div>';
			$(that).append(html);
			$selector = $(this).find('#view'+cur.viewId);//.attr('id');
			setlayer($selector, cur, content[i].layer, false);
			var isWindowOrient = (window.orientation || 0) === 0;
			var wrap = document.getElementById('wrap');
			var container = document.getElementById('container');
			if (isWindowOrient) {
				container.className = 'orient';
			}
			var init = false;
			var slip = Slip(wrap, 'y')
				.webapp()
				.end(function() {
					var orient = this.orient.join('');

					// if (orient.indexOf('up') > -1) {
					// 	if (!init) {
					// 		document.getElementsByTagName('b')[0].style.opacity = '0';
					// 		init = true;
					// 	}
					// }
					console.log("p:" + this.page)
				});

			window.jump = function (page) {
				slip.jump(page);
			}
		}
	}
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
		
		
		
		
		
		
		
		
	
});