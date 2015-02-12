angular.module('feedVisApp')
.controller('GoalListCtrl', function($scope){	
	this.addNewGoal = function(){		
		$scope.globalCtrl.allGoalData.push({
			date: new Date()
		});
	}
	this.deleteGoal = function(index){
		$scope.globalCtrl.allGoalData.splice(index,1);
	}
});

