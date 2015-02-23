angular.module('feedVisApp')
.controller('GoalItemController', function($scope){
	this.isEditing = $scope.goalData.title?false:true;
	this.toggleEditing = function(){
		this.isEditing = !this.isEditing;
	}
});

