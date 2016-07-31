define(function(require, exports, module) {
	var imgdown = require('../imgdown');
	
	var drawWord = function (main, wordData){
		require('d3');
		require('d3.layout.cloud');
		  var fill = d3.scale.category20();
		  d3.layout.cloud().size([500, 500])
		      .words(wordData)
		      .padding(5)
		      .rotate(function() { return ~~(Math.random() * 2) * 90; })
		      //.font("Impact")
		      .fontSize(function(d) { return d.value; })
		      .on("end", draw)
		      .start();

		  function draw(words) {
		    var svg=d3.select(main).append("svg").attr('id','svgWord')
		        .attr("width", 500)
		        .attr("height", 500)
		        .append("g")
		        .attr("transform", "translate(180,200)")
		        .selectAll("text")
		        .data(words)
		        .enter().append("text")
		        .style("font-size", function(d) { return d.size + "px"; })
		        //.style("font-family", "Impact")
		        .style("fill", function(d, i) { return fill(i); })
		        .attr("text-anchor", "middle")
		        .attr("transform", function(d) {
		          //return "translate("+[d.x,d.y]+")";
		          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		        })
		        .text(function(d) { return d.name; });
		  }
		  imgdown.svgAsPng();
	}
	module.exports = drawWord;
});