angular.module('feedVisApp')
.controller('GraphTableCtrl', function($scope, $http){

	$scope.data = [];

	$scope.columnDict = [];

	$scope.fetchData = function(){
		$http.get('data/test.json').success(function(json){
			$scope.data = json;
			$scope.columnDict = _.map($scope.data, function(){return true});
		})
	}

	$scope.fetchData();

});

