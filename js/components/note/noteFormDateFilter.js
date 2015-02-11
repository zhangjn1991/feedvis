angular.module('feedVisApp')
.filter('noteFormDateFilter', function($filter){
	return function(input){
		return $filter('date')(new Date(input * 1000), 'yyyy-MM-dd');
	}
})