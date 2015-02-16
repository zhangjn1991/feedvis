angular.module('feedVisApp')
.controller('NoteCtrl', function($scope){
	
	this.isExpanded = $scope.noteData.goalId?false:true;	
	//If the object is empty expand the form.
	// this.isExpanded = false;

	this.test = $scope.globalCtrl.test;

	this.expand = function(){
		this.isExpanded = true;		
	}

	this.fold = function(){
		this.isExpanded = false;		
	}
	this.getNoteGoal = function(){		
		var goal = _.find($scope.globalCtrl.allGoalData, function(item){
			return item.id == $scope.noteData.goalId;
		})		
		return goal? goal.title: "";
	}
	this.isGoalSelected = function(goal){
		return $scope.noteData.goalId == goal.id;
	}
	this.isDefaultOptionSelected = function(){
		return $scope.noteData.goalId < 0 || $scope.noteData.goalId == undefined
	}
});

