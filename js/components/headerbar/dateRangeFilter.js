angular.module('feedVisApp')
.filter('dateRangeFilter', function($filter){
	return function(input){
		var start = $filter('date')(new Date(input.start * 1000), 'MMM d');
		var end = $filter('date')(new Date(input.end * 1000), 'MMM d');
		return start + " - " + end;
	}
})