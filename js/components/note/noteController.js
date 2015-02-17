angular.module('feedVisApp')
.controller('NoteCtrl', function($scope){
	
	this.isExpanded = $scope.noteData.goalId?false:true;	
	//If the object is empty expand the form.
	// this.isExpanded = true;

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
	

	this.getResultTypeClass = function(){
		if($scope.noteData.resultType > 0)
			return "up";
		else if ($scope.noteData.resultType == 0)
			return "flat";
		else
			return "down";
	}

	this.switchResultType = function(){
		$scope.noteData.resultType = ($scope.noteData.resultType + 2) % 3 - 1;
	}


});

