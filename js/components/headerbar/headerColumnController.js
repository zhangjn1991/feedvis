angular.module('feedVisApp')
.controller('HeaderColumnCtrl', function($scope){	
	this.isGraphVisible = function(){		
		return $scope.columnDict[$scope.$index];
	};

	this.setGraphVisible = function(isVisible){
		$scope.columnDict[$scope.$index] = isVisible;
	};
})