angular.module('feedVisApp')
.controller('ColumnCtrl', function($scope){
	this.isGraphVisible = function(){
		return $scope.columnDict[$scope.$index];
	};
})