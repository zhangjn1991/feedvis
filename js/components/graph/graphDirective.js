angular.module('feedVisApp')
.directive('graph', function(){
	return {
		restrict: 'A',
		scope:{
			data:'='
		},
		controller:'GraphController',
		controllerAs:'GraphController',		
		templateUrl:'js/components/graph/graph.html',
		link: function(scope, element, attrs, GraphController){
			GraphController.init(element);
		}
	}
});

