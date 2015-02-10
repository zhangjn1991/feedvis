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
				$('.global-container').scrollLeft($(this).scrollLeft());
			});
			
			//This may break when .global-container is another directive. Because the .global-container may not exist when this line is run.
		}
	}
})