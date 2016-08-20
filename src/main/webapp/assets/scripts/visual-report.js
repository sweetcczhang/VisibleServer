define(function(require, exports, module) {
		require('jquery');
		require('jquery.qrcode.js');
		require('qrcode');

		require('./bootstrap/bootstrap.min.css');
		require('../css/header.css');
		require('../css/visual-report.css');
		
		require('bootstrap');
		var msgbox = require('./msgbox.js');
		$(function() {
			loadreport();
			$('.table-container').on('click','.td-pc', function() {
				var id = $(this).attr('id');
				var session = window.sessionStorage;
				var userData = JSON.parse(session.getItem('userData'));
				console.log(userData);
				console.log(id);
				window.location.href = 'reportPC?reportid='+id;
			});
			$('.table-container').on('click','.td-phone', function() {
				var id = $(this).attr('id');
				$('#qrcode').empty();
				$('#qrcode').qrcode({
					width: 200, //宽度
					height:200, //高度
					text: 'http://192.168.1.126:8080/VisibleServer/visual/reportPhone?reportid='+id//任意内容
				});
				$('.qr-container').css('display', 'block');
				$('.qr-bg').on('click', function() {
					$('.qr-container').css('display', 'none');
				});

			});
			$('.table-container').on('click','.td-del', function() {
				var id = $(this).attr('id');
				var api = '../user/deletereport';
				$.ajax({
					type:'get',
					url: api,
					async: true,
					data: {reportid: id},
					dataType:"json",
					jsonp: 'callback',
					crossDomain:true,
					success:function (data) {
						msgbox.promp('删除成功');
						loadreport();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest.status);
						//creatTable(null);
					}
				});
			});
		})
		function loadreport(){
			var api = '../user/getallreport';
			var session = window.sessionStorage;
			userid = parseInt(session.getItem('userid'))|| 1;
			$.ajax({
				type:'get',
				url: api,
				async: true,
				data: {userid: userid },
				dataType:"json",
				jsonp: 'callback',
				crossDomain:true,
				success:function (data) {
					console.log(data);
					reportTable(data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest.status);
				}
			});
		}
		function reportTable(data) {
			var tr = [];
			if(!data) return;
			for( var i = 0; i < data.DATA.length; i++) {
				var s = data.DATA[i];
				var report = JSON.parse(s.reportData) || {};
				var title = report.desc.title || 'kong';
				var id = s.id;
				var op = '<tr><td>'+ s.id + '</td><td>'+title+'</td><td><span class="td-pc" id="'+s.id+'">PC版</span >|<span class="td-phone" id="'+s.id+'">手机版</span>|<span class="td-del" id="'+s.id+'">删除</td></tr>';
				tr.push(op);
			}
			// var session = window.sessionStorage;
			// session.setItem('userData',JSON.stringify(data));
			var table = '<table class="table table-bordered  table-striped">'+
				'<thead>'+
				' <tr>'+
				'<th>报告标识</th>'+
				'<th>报告标题</th>'+
				'<th>数据操作</th>'+
				'</tr>'+
				'</thead>'+
				'<tbody>'
				+ tr.join('') +
				'</tbody>'+
				'</table>';
			$('.table-container').html(table);
		}
});