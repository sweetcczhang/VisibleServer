define(function(require, exports, module){
	var table = require('./table');
	var file = require('./ajaxfileupload');
	var source = require('./sourcedataexample');
	var changemenu = require('./menu-change');
	var msgbox = require('./msgbox');

	var current = source.sourceData7;
	var session = window.sessionStorage;

	session.setItem('api',null);
	session.setItem('fresh', false);
	session.setItem('current',JSON.stringify(current));
//	console.log(JSON.parse(session.getItem('current')));
			//数据源各选项设置
		$(function() {
			//加载本系统数据
			var randomNum = function() {
				var date = new Date();
				return date.getTime()
			}
			loadData();
			function loadData() {
				var api = '../user/getallcache';
				var userid = {userid: 1};
				var session = window.sessionStorage;
				session.setItem('userid', 1);
				$.ajax({
					type:'get',
					url: api,
					async: true,
					data: userid,
					dataType:"json",
					jsonp: 'callback',
					crossDomain:true,
					success:function (data) {
						console.log(data);
						creatTable(data);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest.status);
						creatTable(null);
					}
				});
			}
			//生成表格
			function creatTable(data) {
				if(!!data === false) {
					data = {};
					data.list = [];
					for(var i in source) {
						data.list.push({id: randomNum(), data: source[i]});
					}
				}

				var tr = [];
				for( var i = 0; i < data.DATA.length; i++) {
	 				var s = data.DATA[i];
	 				var op = '<tr><td>'+ s.id + '</td><td>'+s.title+'</td><td>'+s.relationtype+'</td><td><span class="td-cho" id="'+s.id+'">选择</span>|<span class="td-del" id="'+s.id+'">删除</td></tr>';
	 				tr.push(op);
					if(typeof s.relations != 'object') {
						s.relations = JSON.parse(s.relations);
					}

			 	}
				var session = window.sessionStorage;
				session.setItem('userData',JSON.stringify(data));

				var table = '<table class="table table-bordered  table-striped">'+
							        '<thead>'+
							         ' <tr>'+
							            '<th>数据标识</th>'+
							            '<th>数据标题</th>'+
							            '<th>数据类型</th>'+
							            '<th>数据操作</th>'+	
							          '</tr>'+
							        '</thead>'+
							        '<tbody>'
							        + tr.join('') +
							       	'</tbody>'+	
							    '</table>';
				$('.from-in').html(table);
			}
			$('.from-in').on('click','.td-cho', function() {
				var index = $(this).parents('tr').index();
				//alert(index);
				var session = window.sessionStorage;
				var userData = JSON.parse(session.getItem('userData'));
				console.log(userData);
				console.log(userData.DATA[index]);
				tomaintable(userData.DATA[index]);
			});
			$('.from-in').on('click','.td-del', function() {
				var id = $(this).attr('id');
				var api = '/VisibleServer/user/deleteUserCache';
				$.ajax({
					type:'get',
					url: api,
					async: true,
					data: {cacheid: id, userid: 1},
					dataType:"json",
					//jsonp: 'callback',
					crossDomain:true,
					success:function (data) {
						msgbox.promp('删除成功');
						loadData();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest.status);
						creatTable(null);
					}
				});
				var session = window.sessionStorage;
				var userData = JSON.parse(session.getItem('userData'));
				console.log(userData);
				console.log(userData.DATA[index]);
				tomaintable(userData.DATA[index]);
			});
			//import 数据来源选择
			$('.import-choose').on('click','li', function(){
				var val = parseInt($(this).index());
				
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');
				if(val === 0){
					$('.from-in').css('display', 'block');
					$('.from-out').css('display', 'none');
				}else {
					$('.from-in').css('display', 'none');
					$('.from-out').css('display', 'block');
				}
			});
			// 外部导入数据
			var fromgroup = {
					'api': function() {
						var api = '<div class="form-group">\
								    <label for="name">API地址</label>\
								    <input type="text" class=" path form-control" placeholder="http://localhost:8080/VisibleServer/hbase/hbaseMapLocation">\
							  		</div>';
							return api;
					},
					'fileload': function() {
						var file = '<div class="form-group">\
							  		<label for="name">文件上传</label>\
							  		<input class="fileload" type="file" name="myfiles" id="fileload" placeholder="文本输入"> \
							  		</div> ';
							return file;
					},		
					'title': function() {
						var title ='<div class="form-group">\
									    <label for="name">标题</label>\
									    <input type="text" class=" title form-control" placeholder="输入名称">\
									</div>';
						return title;
					},
					'desc': function() {
						var d = ' <div class="form-group">\
									    <label for="name">描述</label>\
									    <textarea class=" descirbe form-control" rows="3"></textarea>\
									 </div>';
						return d;
					},
					'relty': function() {
						var d = ' <div class="form-group">\
									    <label for="name">数据关系类型</label>\
									    <select class="form-control relationtype">\
								         <option value="1">一维</option>\
								         <option value="2">二维</option>\
								         <option value="3">多维</option>\
								         <option value="4">时间</option>\
								         <option value="5">层次</option>\
								         <option value="6">网络</option>\
								         <option value="7">地理位置</option>\
								         <option value="8">标签字</option>\
								      </select>\
									 </div>';
						return d;
					},
					'fresh': function() {
						var f = '<div class="form-group refresh">\
								      <input  type="checkbox" data-check =false> 定时刷新\
								   </div>';
						return f;
					}
			};
			var v = $('.source-fromout').find('option:selected').val();
			var dv = '';
			if(v === 'api') {
				$('.form-out-div').append(fromgroup.api() + fromgroup.fresh());
			}
			$('.source-fromout').on('change', function(event) {
				v = $(this).find('option:selected').val();
				//console.log(v);
				if(v === 'api') {
					$('.form-out-div').html(fromgroup.api() + fromgroup.fresh());
				}
				if(v ==='excel' || v ==='txt') {
					dv = fromgroup.fileload()+ fromgroup.relty() + fromgroup.title() + fromgroup.desc();
					$('.form-out-div').empty().append(dv);
				}
			});
			//import-next click;
			//定时刷新按钮
			$('.refresh').on('click', 'input:checkbox', function(){
				if($(this).attr('data-check') === 'false'){
					$(this).attr('data-check', 'true');
				}else{
					$(this).attr('data-check', 'false');
				}
			});
			$('.import-next').on('click', function() {
				var from = parseInt($('.import-choose').find('li.active').index());
				console.log(from);
				if(from === 0) {
					var sel = $('.source-fromin').find('option:selected').val();
					console.log(source[sel]);
					tomaintable(source[sel]);
				}else {
					
					var sel = $('.source-fromout').find('option:selected').val();
					if(sel === 'api') {
						var api = $('.path').val();
						var refresh = $('.refresh').find('input:checkbox').attr('data-check');
						refresh = refresh === 'false' ? false : true ;

						var session = window.sessionStorage;

						session.setItem('api',api);
						session.setItem('fresh', refresh);

						sendAPI(api, tomaintable);
					}else {
						var oj = {};
						oj.type = sel;
						oj.title = $('.title').val();
						oj.desc = $('.describe').val();
						oj.fileAddr = $('.fileload').val();
						oj.filename = $('.fileload').attr('name');
						oj.fileID = $('.fileload').attr('id');
						oj.relationtype = $('.relationtype').find('option:selected').val();
						oj.userid = 1;
						sendFILE(oj, tomaintable);
					}
				
				}
				
			});
			function tomaintable(data) {
					var session = window.sessionStorage;
					session.setItem('current',JSON.stringify(data));
					current = data;
		 			$('.container-main').children().css('display',"none");
					$('.main-table').css('display', 'block');
					table('.table-area', current, false);
					changemenu(1);
				}
			function sendAPI(api, fn){
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
					 			
					 			console.log(data);
					 			fn(data);
					 			
					 		},
					 		error: function(XMLHttpRequest, textStatus, errorThrown) {
					 			console.log(XMLHttpRequest.status);
				            }
					 	});
			}//sendAPI end;
			function sendFILE(obj, fn) {
				console.log(obj);
				var url = 'upload_file?userid=' + obj.userid + '&title='+obj.title +'&relationtype='+parseInt(obj.relationtype,10)+'&desc='+obj.desc;
				var fileID = obj.fileID;
				var filename = obj.filename;
				var fileload = obj.fileload;
				msgbox.promp('正在导入...');
				file.ajaxFileUpload({
					url : url, // 用于文件上传的服务器端请求地址
					type : 'post',
					secureuri : false, // 是否需要安全协议，一般设置为false
					fileElementId : fileID, // 文件上传域的ID
					name : filename,
					dataType : 'text', // 返回值类型 一般设置为json
					data : '',
					success : function(data, status) // 服务器成功响应处理函数
					{
						msgbox.promp(' 导入成功');
						console.log(data);
						var regx=/(\{.*})/;
						var data = data.match(regx)[0];
						data = JSON.parse(data); 

						if(typeof fn ==='function'){
							fn(data.DATA);
						}
						
						
					},
					error : function(data, status, e)// 服务器响应失败处理函数
					{
						console.log(status);
					}
				});

			}//sendFile end;
		})
	// module.export = mainimport;
})