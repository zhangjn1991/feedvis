angular.module('feedVisApp')
.directive('sidebar', function(){
	return {
		restrict:'E',
		scope:{
			data:'='
			
		},
		templateUrl:'js/components/sidebar/sidebar.html',
		link:function(scope, element, attr){
			
			$('.side-bar').on('scroll', function () {    
				$('.graph-view-container').scrollTop($(this).scrollTop());
			});
			
			//This may break when .graph-view-container is another directive. Because the .graph-view-container may not exist when this line is run.


			scope.$watch('data',function(newVal){
				if(newVal.length > 0)
					scope.graphTitles = _.pluck(newVal[0].graphs, "graph_name");
				else
					scope.graphTitles = [];	
			})
		}
	}
})