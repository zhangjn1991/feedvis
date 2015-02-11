angular.module('feedVisApp',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/', {
			redirectTo:'/graph'
		}).
		when('/graph', {
			templateUrl:'partials/graph-view.html'
		}).
		when('/goal', {
			templateUrl:'partials/goal-view.html'
		});
}])

