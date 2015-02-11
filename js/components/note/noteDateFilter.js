angular.module('feedVisApp')
.filter('noteDateFilter', function($filter){
	return function(input){
		return $filter('date')(new Date(input * 1000), 'MM/dd/yyyy');		
	}
})