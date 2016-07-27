define(function(require, exports, module) {
	var imgdown = require('../imgdown');
	
	var drawWord = function (main, wordData){
		require('d3');
		require('d3.layout.cloud');
		  var fill = d3.scale.category20();
		  var dataset = [
		    {"tagname": "Name ", "size": 30},
		    {tagname: "Egg ", size: 22},
		    {tagname: "Color ", size: 15},
		    {tagname: "Sit ", size: 8},
		    {tagname: "Adol ", size: 25},
		    {tagname: "Coming ", size: 10},
		    {tagname: "Javascript ", size: 3},
		    {tagname: "PHP ", size: 40},
		    {tagname: "Hello ", size: 50},
		    {tagname: "AAA ", size: 35},
		    {tagname: "Test ", size: 16},
		    {tagname: "Python ", size: 8},
		    {tagname: "Hello ", size: 16},
		    {tagname: "CSS ", size: 21},
		    {tagname: "Love ", size: 32},
		    {tagname: "Cool ", size: 44},
		    {tagname: "ByeBye ", size: 5},
		    {tagname: "Thanks ", size: 18},
		    {tagname: "China ", size: 28},
		    {tagname: "AJAX ", size: 15},
		    {tagname: "JSON ", size: 22},
		    {tagname: "C/C++ ", size: 32}
		  ];

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