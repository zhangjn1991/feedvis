angular.module('feedVisApp')
.controller('GoalListController', function($scope){	
	this.addNewGoal = function(){		
		$scope.GlobalController.allGoalData.push({
			date: new Date()
		});
	}
	this.deleteGoal = function(index){
		$scope.GlobalController.allGoalData.splice(index,1);
	}
});

