define(function(require,exports,module){
	var match = require('./data-match');
    require('./util/underscore.js');
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
		// index 1 pie  2: Line 3: basicbar 4: Timeline 5 Parallel 6: Tree 7: Ford 8: map 9:Word 10 Horizbar
						if(index ===1 ) {
							switch(relationtype){
								case 1:
									return $this.pieData(data) ;
									break;
								case 2:
								case 4:
								case 7:
								case 8:
									return $this.comToPie(data) ;
									break;
							}
						}
						if(index === 2 || index === 3 ||index === 4 || index === 10 ) {
								switch(relationtype){
									case 1:
											return $this.pieToCom(data);
											break;
									case 2:
									case 4:
									case 7:
									case 8:
											return $this.comLData(data);
											break;
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
		'pieData': function(data){
			/*返回饼图数据格式
			{
				title:'',
				property:[],
				series:[{name:'',value:''}],
				desc:''
				]
			}
			*/
			//console.log(data);
			var dobj = {};
			if(data.objects.length > 0){
				var i;
				var oj = data.objects;
				var series = [];
				for(i = 0; i < oj.length; i++) {
					var name = oj[i];
						series.push({name: name, value: data.relations[name][0][0]});
				}
				dobj.title = data.title;
				dobj.property = data.property[0];
				dobj.describe = data.describe;
				dobj.series = series;
			}
			return dobj;
		},
		'pieToCom': function(data) {
			if(data) {
				var oj = data.objects;
				var series = [];
				for(var i = 0; i < oj.length; i++) {
					var name = oj[i];
					series.push(data.relations[name][0][0]);
				}
				var obj = {
					title: data.title,
					describe: data.describe,
					objects: data.title,
					series: [{name:data.title, data: series}],
					property: data.objects
				}
				return obj;
			}
		},
		'comLData': function(data) {
			//{
			// title:'',
			// property:[],
			// describe: '',
			// objects:[],
			// series:[{name:object, data:[]}]
			// }
			//
			// }
			var propertyArr = [];
			var series = [];
			var property;
			for(var i = 0;i<data.objects.length; i++) {
				var name = data.objects[i];
				var arr = _.unzip(data.relations[name]);
                propertyArr.push(arr[0]);
				series.push({name: name, data: arr[1]});
			}
		//&& propertyArr[0].length !== propertyArr[1].length
			if(propertyArr.length > 1 ){
				var objArr=[];
				for(var i=0;i<propertyArr.length; i++){
					var obj ={
						title: data.title,
						objects:data.objects.slice(i,i+1),
						describe: data.describe,
						series: series.slice(i,i+1),
						property: propertyArr[i]
					};
					objArr.push(obj);
				}
				return objArr;//f返回对象数组
			}else {
				var obj ={
					title: data.title,
					describe: data.describe,
					objects: data.objects,
					series: series,
					property: propertyArr[0]
				};
				return obj; //对象
			}

			//console.log(data);
			
		},
		'comToPie': function(data) {
			if(data) {
				var objArr = [];
				for(var i =0;i<data.objects.length;i++) {
					var name = data.objects[i];
					var arr = _.unzip(data.relations[name]);
					var series = data.relations[name].map(function(item, index) {
						//console.log(item, index);
						return {name: item[0], value: item[1]};
					});
					var obj = {
						title: data.title,
						property: arr[0],
						describe: data.describe,
						objects: [name],
						series: series
					}
					objArr.push(obj);
				}
				return objArr;
			}
		},
		'comData': function(data) {//data.property.length === 1 返回对象 2 返回数组
			console.log(data);
			var i;
			var array = [];
			var dataobj = {};
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