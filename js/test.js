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
  drawGraph(data[0].graphs[0]);

});

var SERIES_PREFIX = 'series';

function drawGraph(graphData){
	drawLineChart(graphData);
	drawLegends(graphData);
}

function drawLineChart(graphData){	
	var svg = d3.select('g')	  
	    .attr('transform', 'translate('+margin.left+','+margin.top+')');

	var allData =_.flatten(_.map(graphData.series,function(d) { return d.data; }));

	var x = d3.scale.linear()
	  	.domain(d3.extent(allData,function(d) { return d.date; }))
	  	.range([0, svgWidth]);

	var y = d3.scale.linear()
	  	.domain(d3.extent(allData,function(d) { return d.value; }))
	  	.range([0, svgHeight]);
		


	var line = d3.svg.line()
		.x(function(d){return x(d.date)})
		.y(function(d){return y(d.value)})

	svg.selectAll('.line')
		.data(graphData.series)
		.enter()
		.append('path')
		.datum(function(d) { return d.data; })
		.attr('class', function(d, i) { return 'line '+ SERIES_PREFIX +i; })
		.attr('d',line);	

	


}

function drawLegends(graphData){

	var legend = d3.select('.legend');

	legend.selectAll('.item')
		.remove()
	
	var items = legend.selectAll('.item')
		.data(graphData.series)
		.enter()
		.append('li')
		.attr('class', function(d, i) { return 'item '+ SERIES_PREFIX+i; })
		.attr('name', function(d, i) { return  SERIES_PREFIX + i; })
		.on('click',legendItemClicked)

	items.append('span')
		.attr('class', 'color')

	items.append('span')
		.attr('class', 'label')
		.text(function(d) { return d.series_name; })
}

function toggleClass(selector,classname){	
	d3.selectAll(selector)
		.classed(classname,
			!d3.selectAll(selector)
				.classed(classname));
}

function legendItemClicked(d,i){
	toggleClass('.item.'+SERIES_PREFIX+i,'hidden');
	toggleClass('.line.'+SERIES_PREFIX+i,'hidden');
}
