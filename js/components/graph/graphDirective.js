angular.module('feedVisApp')
.directive('graph', function(){
	return {
		restrict: 'A',
		scope:{
			data:'='
		},
		controller:'GraphCtrl',
		controllerAs:'graphCtrl',		
		templateUrl:'js/components/graph/graph.html',
		link: function(scope, element, attrs, graphCtrl){
			graphCtrl.init(element);
		}
	}
});

