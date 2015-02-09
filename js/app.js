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

var colors = d3.scale.category10();


var line = d3.svg.line()
	.x(function(d){return x(d.date)})
	.y(function(d){return y(d.value)})




function getTitleDateString(timeStamp){
	return titleDateFormat(new Date(timeStamp * 1000));
}

function drawLineChart(graphData, svg){	
	// var svg = d3.select(this)
	svg.datum(graphData);	  
	    
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

function toggleClass(selector,classname,parent){	
	var items = d3.select(parent).select(selector);	
	items.classed(classname,!items.classed(classname));
}

var app = angular.module('feedVisApp',[]);

app.controller('GraphTableCtrl', function($scope, $http){

	$scope.data = [];
	$scope.fetchData = function(){
		$http.get('data/test.json').success(function(json){
			$scope.data = json;
		})
	}

	$scope.fetchData();

});

app.controller('GraphCtrl', function($scope, $element){
	$scope.visibleDict=_.map($scope.graphData.series, function(d){return true;});
	$scope.toggleVisible = function(index){
		$scope.visibleDict[index] = !$scope.visibleDict[index];
		toggleClass('.line.'+SERIES_PREFIX+index,'hidden',$element[0]);
	}
	$scope.isHidden = function(index){
		return !$scope.visibleDict[index];
	}	
})







app.directive('lineChart', function(){
	return {
		restrict: 'E',
		scope:{
			val:'='
		}		,
		link: function(scope, element, attrs){
			var svg = d3.select(element[0])
				.append('svg')
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

			scope.$watch('val',function(newVal, oldVal){
				svg.selectAll('*').remove();
				if(!newVal)
					return;
				drawLineChart(newVal, svg);

			})
		}
	}
})


