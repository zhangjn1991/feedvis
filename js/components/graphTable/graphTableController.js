angular.module('feedVisApp')
.controller('GraphTableCtrl', function($scope, $http){

	$scope.data = [];
	$scope.fetchData = function(){
		$http.get('data/test.json').success(function(json){
			$scope.data = json;
		})
	}

	$scope.fetchData();

});

