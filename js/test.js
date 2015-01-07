var totalWidth = 960,
	totalHeight = 640,
	margin = { top: 10, right: 10, bottom: 10, left: 10 },
	svgWidth = totalWidth - margin.left - margin.right,
	svgHeight = totalHeight - margin.top - margin.bottom;

var svg = d3.select('svg')
    .attr('width', totalWidth)
    .attr('height', totalHeight)
  .selectAll('g')
    .attr('transform', 'translate('+margin.left+','+margin.top+')');	

d3.json('data/test.json', function(err, data) {
  drawLineChart(data[0].graphs[0]);
});

function drawLineChart(data){	
	var svg = d3.select('g')	  
	    .attr('transform', 'translate('+margin.left+','+margin.top+')');

	var allData =_.flatten(_.map(data.series,function(d) { return d.data; }));

	var x = d3.scale.linear()
	  	.domain(d3.extent(allData,function(d) { return d.date; }))
	  	.range([0, svgWidth]);

	var y = d3.scale.linear()
	  	.domain(d3.extent(allData,function(d) { return d.value; }))
	  	.range([0, svgHeight]);
	
	var colors = d3.scale.category10();


	var line = d3.svg.line()
		.x(function(d){return x(d.date)})
		.y(function(d){return y(d.value)})

	svg.selectAll('.line')
		.data(data.series)
		.enter()
		.append('path')
		.datum(function(d) { return d.data; })
		.attr('class', 'line')
		.attr('stroke', function(d, i) { return colors(i); })
		.attr('d',line);	
}

