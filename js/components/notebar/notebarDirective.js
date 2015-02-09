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
				$('.global-container').scrollLeft($(this).scrollLeft());
			});
			
			//This may break when .global-container is another directive. Because the .global-container may not exist when this line is run.
		}
	}
})