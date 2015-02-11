angular.module('feedVisApp')
.directive('headerbar', function(){
	return {
		restrict:'E',
		scope:true,
		// scope:{
		// 	data:'=',
		// 	dict: '=columnDict'
		// },

		templateUrl:'js/components/headerbar/headerbar.html',
		link:function(scope, element, attr){
			
			$('.header-bar').on('scroll', function () {    
				$('.graph-view-container').scrollLeft($(this).scrollLeft());
			});
			
			//This may break when .graph-view-container is another directive. Because the .graph-view-container may not exist when this line is run.
		}
	}
})