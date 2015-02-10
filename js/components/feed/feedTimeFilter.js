angular.module('feedVisApp')
.filter('feedTimeFilter', function($filter){
	return function(input){
		return $filter('date')(new Date(input * 1000), 'medium');		
	}
})