define(function(require, exports, module){
	require('../css/visual-report.css');
	var datamatch = require('./data-match.js');
	var report_content = {};
	var model = require('./model');
	var setlayer = require('./draw-report.js');
	var msgbox = require('./msgbox.js');
	require('./util/underscore.js');
	$(function() {
		var edit = '<div class="edit-chart" id="ID">'
			+'<div class="chart-title">数据图表标题<div class="chart-desicon"></div></div>'
			+'<div class="chart-con">'
			+'<div class="chart-con-add">+</div>'
			+'<div class="chart-con-view">图标图表图表</div>'
			+'<div class="chart-con-des">数据图表标题数据图表标题数据图表标题数据图表标题数据图表标题</div>'
			+'</div>'
			+'</div>';
		 $('.report-edit').on('click', '.chart-con-add', function() {
		        $('.popup-report').css('display', 'block');
			 	var id = $(this).parents('.edit-chart').attr('id');
				 //弹出框选择
				 $('.popup-report').on('click', '.data-cache , .view-cache', function() {
					 var co = parseInt($(this).data('co'));
					 $(this).siblings().removeClass('active');
					 $(this).addClass('active');
					 $('.cache-box').css('display', 'none');
					 if(co === 1){
						 $('.data-cache-box').css('display', 'block');
						 dataCache();
					 } else if(co ===2) {
						 $('.view-cache-box').css('display', 'block');
						 viewCache();
					 }
				 });
				 $('.popup-btn').on('click', '.btn-add', function() {
					 btnADD(id);
				 });
	     });

	     $('.popup-report').on('click', '.btn-cancel , .popup-cl', function() {
		        $('.popup-report').css('display', 'none');
	     });
		$('.edit-addchart').on('click', function() {
			var id = (new Date()).getTime();
			var div = edit.replace('ID', id);
			$(this).before(div);
		});
		//弹出框返回上一步
		$('.popup-report').on('click', '.goback', function() {
			$('.data-cache-box').css('display', 'none');
			$('.view-cache-box').css('display', 'none');
			$('.cache-box').css('display', 'block');
		});
		$('.button-publish').on('click', function() {
			addreport();
		});
		function dataCache(id){
			var session = window.sessionStorage;
			var userData = JSON.parse(session.getItem('userData'));
			var op = ['<option value="-1">请选择数据</option>'];
			for(var i = 0; i< userData.DATA.length; i++) {
				var d = userData.DATA[i];
				var option = '<option value="'+i+'">'+ d.title +'</option>';
				op.push(option);
			}
			$('#data-select').html(op.join(' '));
			$('#layer-select').on('change',function () {
				var c = $(this).val();
				var dindex = parseInt($('#data-select').find('option:selected').val(), 10);
					//alert(dindex);
				//console.log();
				datamatch(userData.DATA[dindex], c);
			})
		}
		function viewCache(id) {
			var local = window.localStorage;
			var layercache = JSON.parse(local.getItem('layercache') ) || [];
			var op = ['<option value="-1">请选择缓存视图</option>'];
			for(var i = 0; i< layercache.length; i++) {
				var d = layercache[i];
				var option = '<option value="'+i+'">'+ d.title +'</option>';
				op.push(option);
			}
			$('#view-select').html(op.join(' '));
		}
		function btnADD(id){
			$id = $('#'+id);
			var session = window.sessionStorage;
			var userData = JSON.parse(session.getItem('userData'));
			var local = window.localStorage;
			var layercache = JSON.parse(local.getItem('layercache') ) || [];

			var type = $('.popup-report').find('.active').data('co');
			if(parseInt(type) === 1) {//data
				var dindex = parseInt($('#data-select').val());
				var vtype = $('#layer-select').val();
				var title = $('#data-title').val();
				var desc = $('#data-desc').val();
				var cur = userData.DATA[dindex];
				cur.type = vtype;
				cur.title = title;
				cur.describe = desc;
				cur.viewId = randomNum();
				//console.log(dindex, vtype, title, desc);
			}else if( parseInt(type) === 2) {//view cache
				var vindex = $('#view-select').val();
				var title = $('#view-title').val();
				var desc = $('#view-desc').val();
				cur = layercache[vindex];
				cur.title = title;
				cur.describe = desc;
				cur.viewId = randomNum();
				console.log(vindex, vtype, title, desc);
			}
			report_content[id] = cur;
			addContent.call($id, cur);
			console.log(report_content);
		}
		function addContent(cur){
			var that = this;
			var html = '<div class="chart-title">'+cur.title+'<div class="chart-desicon"></div></div>'
				+'<div class="chart-con">'
				+'<div class="chart-con-view" id="view'+cur.viewId+'"></div>'
				+'<div class="chart-con-des">'+cur.describe+'</div>'
				+'</div>';
			$(that).html(html);
			$selector = $(this).find('#view'+cur.viewId);//.attr('id');
			setlayer($selector, cur, cur.type, false);

			$('.popup-report').css('display', 'none');
		}
		function addreport() {
			var api = '../user/addnewreport';
			var session = window.sessionStorage;
			userid = parseInt(session.getItem('userid'))|| 1;
			var destitle = $('#edit-des').find('.des-title').html();
			var descon = $('#edit-des').find('.des-con').val();
			var content = _.values(report_content);
			var report = {
				desc:{
					title: destitle,
					content: descon
				},
				content: content
			};
			console.log(report);
			$.ajax({
		 		type:'get',
		 		url: api,
		 		async: true,
		 		data: {userid: userid, report:JSON.stringify(report) },
		 		dataType:"json",
		 		jsonp: 'callback',
		 		crossDomain:true,
		 		success:function (data) {
		 			console.log(data);
					if(!!data.SUCCESS){
						msgbox.promp('发布成功');
						window.location.href = 'visual-report';
					}
		 		},
		 		error: function(XMLHttpRequest, textStatus, errorThrown) {
		 			console.log(XMLHttpRequest.status);
	            }
		 	});
		}
		function randomNum() {
			var date = new Date();
			return date.getTime()
		}

	})
})