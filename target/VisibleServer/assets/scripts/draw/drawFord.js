define(function(require,exports,module){
	var imgdown = require('../imgdown');
	//绘制力导向图
	require('../../css/ford.css');
	var drawFord = function(svg,width,height,ford){
		var nodes = ford.nodes,
			edges = ford.edges;
			//2.转换数据
		var force = d3.layout.force()
							.nodes(nodes)	//设定顶点数组
							.links(edges)	//设定边数组
							.size([width,height])	//设定作用范围
							.linkDistance(90)	//设定边的距离
							.charge(function(d){
								return Math.random()*(-1000);
							});	//设定顶点的电荷数
		
		force.start();	//开启布局计算
		
		// console.log(nodes);	//输出转换后的数据
		// console.log(edges);
		
		//3.绘制
		var color = d3.scale.category20();
		
		var drag = force.drag()
						.on("dragstart",function(d){
							//拖拽开始后设定被拖拽对象为固定
							d.fixed = true; 
						})
						.on("dragend",function(d,i){
							//拖拽结束后变为原来的颜色
							d3.select(this).style("fill",color(d.weight % 20));
						})
						.on("drag",function(d){
							//拖拽中对象变为黄色
							d3.select(this).style("fill","yellow");
						});
			
		//绘制连线
		var lineupdate=svg.selectAll(".forceLine")
							.data(edges);
		var lineenter=lineupdate.enter().append("line")
							.attr("class","forceLine");
		var lineexit=svg.selectAll(".forceLine")
							.data(edges)
							.exit().remove();
		
		//绘制节点
		var circlesupdate=svg.selectAll(".forceCircle")
							.data(nodes);
		var circlesenter=circlesupdate.enter()
							.append("circle")
							.attr("class","forceCircle")
							.attr("r",function(d,i) {
								return circleSize(d.weight);
							})
							.style("fill",function(d,i){
								return color(d.weight % 20);
							})
							.call(force.drag);
		var circlesexit=circlesupdate.exit().remove;
		
		//绘制文字
		var textsupdate=svg.selectAll(".forceText")
							.data(nodes);
		var textsenter = textsupdate.enter()
							.append("text")
							.attr("class","forceText")
							.attr("x",function(d){ return d.x; })
							.attr("y",function(d){ return d.y; })
							.attr("dy", ".3em")
							.text(function(d){ return d.name; });
		var textsexit=textsupdate.exit().remove();
		//tick事件的监听器
		force.on("tick", function(){
			
			 //更新边
			 lineenter.attr("x1",function(d){ return d.source.x; });
			 lineenter.attr("y1",function(d){ return d.source.y; });
			 lineenter.attr("x2",function(d){ return d.target.x; });
			 lineenter.attr("y2",function(d){ return d.target.y; });
			 
			 //更新顶点
			 circlesenter.attr("cx",function(d){ return d.x; });
			 circlesenter.attr("cy",function(d){ return d.y; });
			 
			 //更新顶点文字
			 textsenter.attr("x",function(d){ console.log(d); return d.x; });
			 textsenter.attr("y",function(d){ return d.y; });
			 
		});
		
		
		//力学图运动开始时
		force.on("start", function(){
			console.log("运动开始");
		});
			
		//力学图运动结束时
		force.on("end", function(){
			console.log("运动结束");
		});
	}
	imgdown.svgAsPng();

	function circleSize(weight) {
		return weight*2+12 > 25 ? 25 : weight*2+12;
	}
	
	module.exports = drawFord;
});