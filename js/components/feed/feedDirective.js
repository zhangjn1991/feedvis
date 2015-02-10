angular.module('feedVisApp')
.directive('feed', function(){
	return {
		restrict: 'A',
		scope:{
			data:'='
		},		
		templateUrl:'js/components/feed/feed.html'
	}
});

