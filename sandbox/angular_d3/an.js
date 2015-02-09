var app = angular.module('testApp', []);

app.controller('TableCtrl', ['$scope', '$http', function ($scope,$http){
	$scope.data = [];
	$scope.fetch = function(){
		$http.get('test.json').success(function(json){
			$scope.data = json;
		})
	}

	
}])


app.directive('circleGraph', function(){
	return{
		restrict: 'E',
		scope:{
			val: '='
		},
		link: function(scope, element, attrs){
			console.log('call');
			var svg = d3.select(element[0])
				.append('svg')
				.attr('width','200px')
				.attr('height', '200px');

			scope.$watch('val', function (newVal, oldVal){

				svg.selectAll('*').remove();
				if(!newVal)
					return;

				svg.append('circle')
				    .attr('cx', '100px')
				    .attr('cy', '100px')
				    .attr('r', newVal*10)
				    .style('fill', 'steelblue');

			})
		}
	}
})