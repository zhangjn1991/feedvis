angular.module('feedVisApp')
.controller('GraphCtrl', function($scope, $element){
	var self = this;
	
	var SERIES_PREFIX = 'series', TAB_NAMES=['Graph', 'Feed'];
	var totalWidth = 300,
		totalHeight = 200,
		margin = { top: 20, right: 15, bottom: 20, left: 30 },
		svgWidth = totalWidth - margin.left - margin.right,
		svgHeight = totalHeight - margin.top - margin.bottom;


	var axisDateFormat = d3.time.format('%e');

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


	var line = d3.svg.line()
		.x(function(d){return x(d.date)})
		.y(function(d){return y(d.value)})




	this.visibleDict = [];

	this.init = function(element){
		$element = element;
		this.svg = d3.select(element[0])
				.select('svg')
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

		$scope.$watch('data',function(newVal, oldVal){			
			if(!newVal)
				return;
			self.graphData = newVal;
			self.visibleDict = _.map(newVal.series, function(d){return true;});
			self.drawLineChart();

		})
	};

	this.toggleClass = function(selector,classname,parent){	
		var items = d3.select(parent).select(selector);	
		items.classed(classname,!items.classed(classname));
	}	
	this.toggleVisible = function(index){
		this.visibleDict[index] = !this.visibleDict[index];
		this.toggleClass('.line.'+SERIES_PREFIX+index,'hidden',$element[0]);
	}
	this.isHidden = function(index){
		return !this.visibleDict[index];
	}	


	this.drawLineChart = function (){	

		this.svg.selectAll('*').remove();
		this.svg.datum(this.graphData);	  
		    
		var allData =_.flatten(_.map(this.graphData.series,function(d) { return d.data; }));
		
		x.domain(d3.extent(allData,function(d) { return d.date; }));

		y.domain(d3.extent(allData,function(d) { return d.value; }));
		
		this.svg.append('g')
			.attr('class','x axis')
			.attr('transform', 'translate(' + 0 + ',' + svgHeight + ')')
			.call(xAxis);

		this.svg.append('g')
			.attr('class','y axis')		
			.call(yAxis);

		this.svg.selectAll('.line')
			.data(this.graphData.series)
			.enter()
			.append('path')
			.datum(function(d) { return d.data; })
			.attr('class', function(d, i) { return 'line '+ SERIES_PREFIX +i; })
			.attr('d',line);

		
	}
})