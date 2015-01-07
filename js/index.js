var totalWidth = 300,
	totalHeight = 200,
	margin = { top: 10, right: 10, bottom: 20, left: 30 },
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
	.tickSize(-svgHeight)
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
	.ticks(2)

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

	var columns = globalContainer.selectAll(".column")
		.data(data)
		.enter()
		.append('div')
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
		.text('Post Number')

	var graphContainer = columns.append('div')
		.attr('class', 'graphContainer')

	graphContainer.selectAll('.graph')
		.data(function(d) { return d.graphs; })
		.enter()
		.append('svg')
		.attr('class', 'graph')
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.each(drawLineChart)



}


function drawLineChart(data){	
	var svg = d3.select(this)	  
	    
	var allData =_.flatten(_.map(data.series,function(d) { return d.data; }));
	
	x.domain(d3.extent(allData,function(d) { return d.date; }));

	y.domain(d3.extent(allData,function(d) { return d.value; }));
	
	svg.selectAll('.line')
		.data(data.series)
		.enter()
		.append('path')
		.datum(function(d) { return d.data; })
		.attr('class', 'line')
		.attr('stroke', function(d, i) { return colors(i); })
		.attr('d',line);

	svg.append('g')
		.attr('class','x axis')
		.attr('transform', 'translate(' + 0 + ',' + svgHeight + ')')
		.call(xAxis);

	svg.append('g')
		.attr('class','y axis')		
		.call(yAxis);
}

