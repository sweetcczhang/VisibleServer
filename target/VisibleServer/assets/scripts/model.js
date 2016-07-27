define(function(require,exports,module){
	var match = require('./data-match');

	var dataobj={
				'title': '某地区蒸发量',
				'objects': ['蒸发量'],
				'property': ['8月', '9月', '10月', '11月', '12月'],
				'relations': {
					'蒸发量': [	
						{'name': '8月', 'value': 56.2 },
						{'name': '9月', 'value': 32.3 },
						{'name': '10月', 'value': 20.3 },
						{'name': '11月', 'value': 20.9 },
						{'name': '12月', 'value': 25.1}
					]
				}
			};
	var model = {
		'change': function(data, index) {
			var $this = this;
			if(data) {
				index = parseInt(index);
				relationtype = parseInt(data.relationtype);
				//console.log(data);
				//console.log(match(data, index));
				if(index !== 0 && match(data, index)) {
					
		// relationtype 1 yiwei 2 2wei  3 duowei 4 shijian 5 cengci 6 wangluo 7 map 8 zi
		// index 1 Bar  2: Line 3: Pie 4: Timeline 5 Parallel 6: Tree 7: Ford 8: map 9:Word
						
						if(index === 1 || index === 2 ) {
								switch(relationtype){
									case 1: 
									case 2:
											return $this.comData(data) ;
											break;
									case 4:
											return $this.timeData(data);
											break;
									
									case 7:
											return $this.map2Com(data);
											break;
									case 8:break;
									
								}
						}

						if (index === 3) {
							switch(relationtype){
									case 1: 
									case 2:
											return $this.pieData(data) ;
											break;
									case 4:
											return $this.pieData($this.timeData(data));
											break;
									
									case 7:
											return $this.pieData($this.map2Com(data));
											break;
									case 8:break;
									
								}
						}
						if(index ===4) {
							switch(relationtype){
									case 1: 
									case 2:
											return $this.comData(data) ;
											break;
									case 4:
											return $this.timeData(data);
											break;
									
									case 7:
											return $this.map2Com(data);
											break;
									case 8:break;
									
								}
						}
						if(index === 5){
							return $this.comData(data);
						}
						if(index === 6){
							return $this.treeData(data);
						}
						if(index === 7) {
							return $this.fordData(data);
						}
						if(index === 8){
							return $this.mapData(data);
						}
						if(index === 9){
							return $this.wordData(data);
						}
						
				}//if(index)
			}//if(data)
		},
		'pieData': function(data){//返回数组
			console.log(data);
			var array = [];

			if(data.objects.length > 0){
				var dataobj = {};
				var i;
				var oj = data.objects;
				for(i = 0; i < oj.length; i++) {
					var dataobj = {};
					dataobj.title = data.title;
					dataobj.objects = oj[i];
					dataobj.property = (function(property) {
						if(property.length > 1) {
							return property[i];
						} else {
							return property[0];
						}
					}(data.property));
					dataobj.relations = {};
					dataobj.relations[oj[i]] = data.relations[oj[i]];
					array.push(dataobj);
				}
			} 
			if(!data) {
				array.push(dataobj);
			}

			return array;
		},
		'comLengData': function(data) {
			
			console.log(data);
			
		},
		'comData': function(data) {//data.property.length === 1 返回对象 2 返回数组
			console.log(data);
			var i;
			var array = [];
			
			if((data.property.length === 1 && data.objects.length > 0) || (data.objects.length == 1)) {
				var i, oj = data.objects;
				//alert(1);
				dataobj.title = data.title;
				dataobj.objects = data.objects;
				dataobj.property = data.property[0];
				dataobj.relations = data.relations;
				return dataobj;
			} 
			
			if((data.property.length > 1) || (data.property.length === 1 && data.objects.length === 1)) {
					for( i = 0; i < data.objects.length; i++) {
						dataobj = {};
						dataobj.title = data.title;
						dataobj.objects = [];
						dataobj.objects.push(data.objects[i]);
						dataobj.property = data.property[i];
						dataobj.relations = {};
						dataobj.relations[data.objects[i]] = data.relations[data.objects[i]];
						array.push(dataobj);
					}
				console.log(array);
				return array;
			}
			
		},
		'timeData': function(data) {
			if(parseInt(data.relationtype) == 4) {
				var dj = {};
				dj.describe = data.describe;
				dj.title = data.title;
				dj.objects = data.objects;
				dj.relationtype = data.relationtype;
				dj.relations = {};
				dj. property = [];
				var subproperty = {};
				for( var it in data.relations) {
					
					var value = [];
					data.relations[it].map(function(item, index){
						subproperty[item[0]] = item[0];
						value.push(item[1]);
					});
					dj.relations[it] = [];
					dj.relations[it].push(value);
				}
				for( var i in subproperty){
					dj.property.push(i);
				}
				console.log(dj);
				return dj;
			}
		},
		'treeData': function(data) {
			var dataobj={
				'name':'如何学习D3',
				'children':
				[
					{ 
					  'name':'预备知识' , 
				  	  'children':
				  	  [
					  	  	{'name':'HTML & CSS' },
					  	  	{'name':'JavaScript' },
					  	  	{'name':'DOM' },
					  	  	{'name':'SVG' }
				  	  ] 
				  	},
				  	{ 
						'name':'安装' , 
						'children':
						[
							{
								'name':'记事本软件',
								'children':
								[
									{'name':'Notepad++'},
									{'name':'EditPlus'},
									{'name':'Sublime Text'}
								]
							},
							{
								'name':'服务器软件',
								'children':
								[
									{'name':'Apache Http Server'},
									{'name':'Tomcat'}
								]
							},
							{'name':'下载D3.js'}
						] 
					}]
			};
			if(data) {
				return data.relations;
			}
			return dataobj;
		},
		'fordData': function(data) {
			var dataobj={
			'nodes':[{id:1234, name: '中国' , value:123   },
					 {id:1234, name: '保定' , value:123  },
				  	 {id:1234, name: '北京' , value:123	},
				     {id:1234, name: '上海' , value:123 },
				     {id:1234, name: '天津' , value:123  },
				     {id:1234, name: '河北' , value:123 },
				     {id:1234, name: '海淀区' , value:123 },
				     {id:1234, name: '西城区' , value:123 }
				  ],
			'edges':[{ source : 0 , target: 2  ,weight:2} ,//source,target为node的索引号
				   { source : 0  , target: 3 ,weight:2 } ,
				   { source : 0  , target: 4 ,weight:2} ,
				   { source : 0  , target: 5 ,weight:2} ,
				   { source : 2  , target: 6 ,weight:2} ,
				   { source : 2  , target: 7 ,weight:2} ,
				   { source : 5  , target: 1 ,weight:2} ]
			};
			if(data) {
				 if(data.objects.length > 0) {
                    var objects = {};
                    dataobj.nodes = data.objects.map(function(item) {
                        objects[item] = 0;
                        return {name : item};
                    });
                    dataobj.edges = [];
                    data.relations.map(function(item, index) {
                        var oj = item;
                        var targetlist = item.target.map(function(item, index) {
                            objects[oj.source]++; 
                            objects[item]++;
                           // console.log(item);
                            return {source: data.objects.indexOf(oj.source), target: data.objects.indexOf(item)};
                        })
                        $.merge(dataobj.edges, targetlist);
                    });
                    dataobj.objects = objects;
                    console.log(dataobj);
                }
            }
            return dataobj;
		},
		'mapData': function(data) {
			if(parseInt(data.relationtype) == 7) {
				var dj = {};
				dj.describe = data.describe;
				dj.title = data.title;
				dj.objects = data.objects;
				dj.relationtype = data.relationtype;
				dj.relations = data.relations;
				dj. property = data.property[0];
				console.log(dj);
				return dj;
			}
		},
		'map2Com': function(data) {
			if(parseInt(data.relationtype) === 7) {
				var dj = {};
				dj.describe = data.describe;
				dj.title = data.title;
				dj.objects = data.objects;
				dj.relationtype = data.relationtype
				dj.relations = {};
				dj. property = [];
				var subproperty = {};
				for( var it in data.relations) {
					
					var value = [];
					data.relations[it].map(function(item, index){
						subproperty[item[0]] = item[0];
						value.push(item[1]);
					});
					dj.relations[it] = [];
					dj.relations[it].push(value);
				}
				for( var i in subproperty){
					dj.property.push(i);
				}
				console.log(dj);
				return dj;
			}
		},
		'wordData': function(data) {
			var arr = [];
			for(var i in data.relations){
				var o = data.relations[i];
				var a = o.map(function(item, index){
					return {name:item[0], value: item[1]};
				});
				console.log(a);
				arr = arr.concat(a);
			}
			return arr;
		}
	};
	module.exports=model;
});