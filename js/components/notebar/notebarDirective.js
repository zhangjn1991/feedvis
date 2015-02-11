angular.module('feedVisApp')
.directive('notebar', function(){
	return {
		restrict:'E',
		scope:{
			data:'='
			
		},
		templateUrl:'js/components/notebar/notebar.html',
		link:function(scope, element, attr){
			
			$('.note-bar').on('scroll', function () {    
				$('.graph-view-container').scrollLeft($(this).scrollLeft());
			});
			
			//This may break when .graph-view-container is another directive. Because the .graph-view-container may not exist when this line is run.
		}
	}
})