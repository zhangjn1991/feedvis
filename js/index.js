var SERIES_PREFIX = 'series';
var totalWidth = 300,
	totalHeight = 200,
	margin = { top: 20, right: 15, bottom: 20, left: 30 },
	svgWidth = totalWidth - margin.left - margin.right,
	svgHeight = totalHeight - margin.top - margin.bottom;


var titleDateFormat = d3.time.format("%b %e");

var axisDateFormat = d3.time.format("%e");

var x = d3.scale.linear()
  	.range([0, svgWidth])  	

var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom')	
	.tickPadding(5)
	.tickSize(-5)
	.tickValues(function(d){
		return _.map(d.series[0].data,function(d){ return d.date}) // construct tick values with the date of the first series
	})
	.tickFormat(function(d) { 		
		return axisDateFormat(new Date(d * 1000)); 
	})



var y = d3.scale.linear()  	
  	.range([svgHeight,0]);

var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left')
	.ticks(5)
	// .tickPadding(5)
	.tickSize(-svgWidth)

var colors = d3.scale.category10();


var line = d3.svg.line()
	.x(function(d){return x(d.date)})
	.y(function(d){return y(d.value)})



d3.json("data/test.json", function(json){
	
	clearAll();
	draw(json)
})


function clearAll(){
	d3.selectAll(".globalContainer *")
		.remove();
}

function getTitleDateString(timeStamp){
	return titleDateFormat(new Date(timeStamp * 1000));
}


function draw(data){
	var globalContainer = d3.select(".globalContainer");


	var table = globalContainer.append('table').append('tr');

	var columns = table.selectAll(".column")
		.data(data)
		.enter()
		.append('td')		
		.attr('class', 'column')

	var titleContainer = columns.append('div')
		.attr('class', 'titleContainer')

	titleContainer.append('h2')
		.text(function(d) { 
			return  getTitleDateString(d.date_range.start)
			+ " - " 
			+ getTitleDateString(d.date_range.end);
		})

	titleContainer.append('h3')
		.text('200 Posts')

	var graphContainer = columns.append('div')
		.attr('class', 'graphContainer')

	var graphs = graphContainer.selectAll('.graph')
		.data(function(d) { return d.graphs; })
		.enter()
		.append('div')		
		.attr('class', 'graph')

	graphs
		.append('svg')
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.each(drawLineChart)
	
	graphs
		.append('ul')
		.attr('class', 'legend')
		.each(drawLegends)

}

function drawGraph(graphData){
	drawLineChart(graphData);
	// drawLegends(graphData);
}

function drawLineChart(graphData){	
	var svg = d3.select(this)	  
	    
	var allData =_.flatten(_.map(graphData.series,function(d) { return d.data; }));
	
	x.domain(d3.extent(allData,function(d) { return d.date; }));

	y.domain(d3.extent(allData,function(d) { return d.value; }));
	
	svg.append('g')
		.attr('class','x axis')
		.attr('transform', 'translate(' + 0 + ',' + svgHeight + ')')
		.call(xAxis);

	svg.append('g')
		.attr('class','y axis')		
		.call(yAxis);

	svg.selectAll('.line')
		.data(graphData.series)
		.enter()
		.append('path')
		.datum(function(d) { return d.data; })
		.attr('class', function(d, i) { return 'line '+ SERIES_PREFIX +i; })
		.attr('d',line);

	
}

function drawLegends(graphData){

	var legend = d3.select(this);

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

function toggleClass(selector,classname,parent){	
	var items = d3.select(parent).select(selector);	
	items.classed(classname,!items.classed(classname));
}

function legendItemClicked(d,i){
	var legendElement = this.parentNode.parentNode;
	toggleClass('.item.'+SERIES_PREFIX+i,'hidden',legendElement);
	toggleClass('.line.'+SERIES_PREFIX+i,'hidden',legendElement);
}


