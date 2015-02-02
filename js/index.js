var SERIES_PREFIX = 'series', TAB_NAMES=['Graph', 'Feed'];
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
	drawDateRange(getDateRanges(json));
	drawGraphs(getGraphData(json));
	drawGraphTitle(getTitleData(json));
	
	// draw(json)
})


function clearAll(){
	d3.selectAll(".globalContainer table *")
		.remove();
	d3.selectAll(".sidebar .graphTitle")
		.remove();
}

function getDateRanges(data){
	return _.pluck(data,"date_range");
}

function getGraphData(data){
	var newData = [];
	for(var i = 0; i < data[0].graphs.length; i ++){
		var row = [];
		for(var j = 0;j < data.length; j ++)
			row.push(data[j].graphs[i]);
		newData.push(row);
	}
	return newData;
}

function getTitleData(data){
	return _.pluck(data[0].graphs,"graph_name");
}

function getTitleDateString(timeStamp){
	return titleDateFormat(new Date(timeStamp * 1000));
}

function drawDateRange(titleData){
	var titleRow = d3.select(".globalContainer table")
		.append("tr");

	var columns = titleRow.selectAll("td")
		.data(titleData)
		.enter()
		.append("td");

	var titleContainer = columns.append('div')
		.attr('class', 'titleContainer')

	titleContainer.append('h2')
		.text(function(d) { 
			return  getTitleDateString(d.start)
			+ " - " 
			+ getTitleDateString(d.end);
		})

	titleContainer.append('h3')
		.text('200 Posts')

	var tabContainer = columns.append('div')
		.attr('class', 'tabContainer')

	tabContainer.selectAll('.tab')
		.data(TAB_NAMES)
		.enter()
		.append("div")
		.attr('class', 'tab')
		.text(function(d){return d;})

	tabContainer.select(".tab")
		.classed("active",true);
}

function drawGraphs(graphData){
	var table = d3.select(".globalContainer table")

	var rows = table.selectAll(".graph-row")
		.data(graphData)
		.enter()
		.append("tr")
		.attr("class","graph-row")

	var graphs = rows.selectAll("td")
		.data(function(d){return d})
		.enter()
		.append("td")
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

function drawGraphTitle(titleData){
	var table = d3.select(".sidebar table");

	table.selectAll(".graphTitle")
		.data(titleData)
		.enter()
		.append("tr")
		.attr('class', 'graphTitle')
		.append("td")
		.append("div")
		.text(function(d){return d});
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


