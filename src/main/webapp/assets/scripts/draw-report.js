define(function(require, exports, module) {
	var jquery = require('jquery');
				require('saveSvgAsPng');
	var model = require('./model'),
		drawLine = require('./draw/drawLine'),
		drawBar = require('./draw/drawBar'),
		drawHorizBar = require('./draw/drawHorizBar'),
		drawPie = require('./draw/drawPie'),
		drawTree = require('./draw/drawTree'),
		drawFord = require('./draw/drawFord'),
		drawTimeLine = require('./draw/drawTimeLine'),
		drawTimeLineD = require('./draw/drawTimeLineD'),
		drawParallel = require('./draw/drawParallel'),
		drawMap = require('./draw/drawMap'),
		drawMapArea = require('./draw/drawMap-area'),
		drawWord = require('./draw/drawWord'),
		drawRadar = require('./draw/drawRadar');

	var source = require('./sourcedataexample');

	var drawDVL = function(selector, data, index, fresh) {
		$selector = $(selector);
		var session = window.sessionStorage;
		fresh = session.getItem('fresh') || false;
		index = parseInt(index);
		switch(index) {
			case 1: setPie($selector, data, fresh);
					break;
			case 2: setLine($selector, data, fresh);
					break;
			case 3:
					setBar($selector, data, fresh);
					break;
			case 4: setTimeline($selector, data, fresh);
					break;
			case 5: setParallel($selector, data, fresh)
					break;
			case 6: setTree($selector, data, fresh);
					break;
			case 7: setFord($selector, data, fresh);
					break;
			case 8: setMap($selector, data, fresh);
					break;
			case 9:
					setWord($selector, data, fresh);
					break;
			case 10:
					setHorizBar($selector, data, fresh);
					break;
			default:
					console.log("default");
		}
	};
	function setBar($selector, data, fresh){
		var bardata = model.change(data , 3);
		var id = data.viewId || 'main';
		//debugger;
		if( bardata instanceof  Array){
			//对象数组
			var frag='<ul class="datalists">';
			for(var i = 0; i < bardata.length; i++){
				frag+='<li class="datalist"  data-index="'+ i +'">'+ bardata[i].objects[0] +'</li>';
			}
			frag+='</ul>';
			var html='<div class="dataproperty">' + frag +'</div>\
						<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			$selector.on("click", "li.datalist", function(){
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).data('index');
				var main = document.getElementById(id);

				var barData = bardata[index];
				drawBar(main, barData);

			});
			$selector.find("li.datalist").eq(0).trigger("click");

		}else {
			var html='<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			var main = document.getElementById(id);
			drawBar(main, bardata);
		}	
	}
	function setHorizBar($selector, data, fresh) {
		var bardata = model.change(data , 10);
		var id = data.viewId || 'main';
		if( bardata instanceof  Array){
			//对象数组
			var frag='<ul class="datalists">';
			for(var i = 0; i < bardata.length; i++){
				frag+='<li class="datalist"  data-index="'+ i +'">'+ bardata[i].objects[0] +'</li>';
			}
			frag+='</ul>';
			var html='<div class="dataproperty">' + frag +'</div>\
						<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			$selector.on("click", "li.datalist", function(){
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).data('index');
				var main = document.getElementById(id);

				var barData = bardata[index];
				drawHorizBar(main, barData);

			});
			$selector.find("li.datalist").eq(0).trigger("click");

		}else {
			var html='<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			var main = document.getElementById(id);
			drawHorizBar(main, bardata);
		}
	}
	function setLine($selector, data, fresh){
		var linedata = model.change(data, 2);
		var id = data.viewId || 'main';
		if( linedata instanceof  Array){
			//对象数组
			var frag='<ul class="datalists">';
			for(var i = 0; i < linedata.length; i++){
				frag+='<li class="datalist"  data-index="'+ i +'">'+ linedata[i].objects[0] +'</li>';
			}
			frag+='</ul>';
			var html='<div class="dataproperty">' + frag +'</div>\
						<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			$selector.on("click", "li.datalist", function(){
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).data('index');
				var main = document.getElementById(id);

				var lineData = linedata[index];
				drawBar(main, lineData);

			});
			$selector.find("li.datalist").eq(0).trigger("click");

		}else {
			var html='<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			var main = document.getElementById(id);
			drawBar(main, linedata);
		}
	}
	function setPie($selector, data, fresh) {
		var pieData = model.change(data, 1);
		var id = data.viewId || 'main';
		console.log(pieData);
		if( pieData instanceof Array){
			var frag='<ul class="datalists">';
			for(var i = 0; i < pieData.length; i++){
				frag+='<li class="datalist"  data-index="'+ i +'">'+ pieData[i].objects[0] +'</li>';
			}
			frag+='</ul>';
			var html='<div class="dataproperty">' + frag +'</div>\
				<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			$selector.on("click", "li.datalist", function(){
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).data('index');
				var main = document.getElementById(id);
				var pie = pieData[index];
				drawPie(main, pie);

			});
			$selector.find("li.datalist").eq(0).trigger("click");
		} else {
			var html='<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			var main = document.getElementById(id);
			drawPie(main, pieData);
		}
	}
	function setTimeline($selector, data, fresh){
		var tlData = model.change(data, 4);//对象数组
		var id = data.viewId || 'main';
				console.log(tlData);
				var html='<div class="view-area-box" id="'+id+'"></div>';
				$selector.html(html);
				var main = document.getElementById(id);
				if(fresh == 'false'){
					drawTimeLine(main, tlData);
				}else{
					drawTimeLineD(main, tlData);
				}
				
	}
	function setParallel($selector, data, fresh) {
		var plData = model.change(data, 5);
		var id = data.viewId || 'main';
		if(data.property.length === 1){
			
			console.log(plData);
			var html='<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			var main = document.getElementById(id);
			drawParallel(main, plData);
		} else {
			
			console.log(plData);
			var frag='<ul class="datalists">';
			for(var i = 0; i < plData.length; i++){
					frag+='<li class="datalist"  data-index="'+ i +'">'+ plData[i].objects[0] +'</li>';
			}
			frag+='</ul>';
			var html='<div class="dataproperty">' + frag +'</div>\
					<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			$selector.on("click", "li.datalist", function(){
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).data('index');
				var main = document.getElementById(id);
				var pie = plData[index];
				drawParallel(main, pie);
						
			});
			$selector.find("li.datalist").eq(0).trigger("click");
		}
		
	}
	function setTree($selector, data, fresh) {
		console.log($selector.attr('class'));
		var id = data.viewId || 'main';
		var tree = model.change(data, 6);
		$selector.empty();
		var width = $selector.width()*0.9;
		var height = 500;
		
		//边界空白
		var padding = {left: 80, right:50, top: 20, bottom: 20 };
		//创建svg容器
		var svg = d3.select('#'+id)
	           .append("svg")
	           .attr("id","svgTree")
		       .attr("width", width)
		       .attr("height", height + padding.top + padding.bottom);
	    var svgcontainer= svg.append("g")
	    	   			     .attr("transform","translate("+ padding.left + "," + padding.top + ")");
	  	//保存图片标志
	 	//savePic(width-20,height,svg.attr("id"));
	 	console.log(tree);
	 	drawTree(width,height,svgcontainer,tree);
	 	$('body').on("contextmenu", 'svg', function(){
	 		event.preventDefault();
			var svgid = document.getElementById('svgTree');
			//console.log(svgid);
			saveSvgAsPng(svgid, data.title+'.png');
		});
	}
	function setFord($selector, data, fresh) {
		var id = data.viewId || 'main';
			$selector.empty();
			var width  = $selector.width();	//SVG绘制区域的宽度
			var height = 500;	//SVG绘制区域的高度
				
			var svg = d3.select('#'+id)			//选择<body>
						.append("svg").attr("id","svgFord")			//在<body>中添加<svg>
						.attr("width", width)	//设定<svg>的宽度属性
						.attr("height", height);//设定<svg>的高度属性
			//savePic(width-20,height,svg.attr("id"));
			//1.确定初始数据
			var ford = model.change(data, 7);
			drawFord(svg,width,height,ford.nodes,ford.edges);
			$('body').on("contextmenu", 'svg', function(){
				event.preventDefault();
				var svgid = document.getElementById('svgFord');
				saveSvgAsPng(svgid, data.title+'.png');
			});
	}
	function setMap($selector, data, fresh) {
		var id = data.viewId || 'main';
		var html='<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			var main = document.getElementById(id);
			var mapData = model.change(data, 8);
			drawMapArea(main, mapData);
	}
	function setWord($selector, data, fresh) {
		var id = data.viewId || 'main';
		var html='<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			var main = document.getElementById(id);
			var wordData = model.change(data, 9);
			console.log( wordData);
		drawWord(main, wordData);
		$('body').on("contextmenu", 'svg', function(event){
			event.preventDefault();
			var svgid = document.getElementById('svgWord');
			saveSvgAsPng(svgid, data.title+'.png');
		});
	}
	function setRadar($selector, data, fresh) {
		var plData = model.change(data, 5);
		var id = data.viewId || 'main';
		if(data.property.length === 1){
			
			console.log(plData);
			var html='<div class="view-area-box" id="'+id+'"></div>';
			$selector.html(html);
			var main = document.getElementById(id);
			drawRadar(main, plData);
		} else {
			
			console.log(plData);
			var frag='<ul class="datalists">';
			for(var i = 0; i < plData.length; i++){
					frag+='<li class="datalist"  data-index="'+ i +'">'+ plData[i].objects[0] +'</li>';
			}
			frag+='</ul>';
			var html='<div class="dataproperty">' + frag +'</div>\
					<div class="view-area-box" id="main"></div>';
			$selector.html(html);
			$selector.on("click", "li.datalist", function(){
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).data('index');
				var main = document.getElementById(id);
				var pie = plData[index];
				drawRadar(main, pie);
						
			});
			$selector.find("li.datalist").eq(0).trigger("click");
		}
	}
	module.exports = drawDVL;
});