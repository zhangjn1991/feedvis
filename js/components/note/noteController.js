angular.module('feedVisApp')
.controller('NoteCtrl', function($scope){
		
	this.isNewlyCreatedNote = function(){
		return $scope.noteData.goalId == -1;
	}

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

	this.startEditing = function(){
		this.expand();
		this.backupNoteData = _.clone($scope.noteData);
	}
	this.saveEditing = function(){
		this.fold();
		this.backupNoteData = null;
	}
	this.cancelEditing = function(){		
		if(this.isNewlyCreatedNote()){
			if(confirm("Are you sure to cancel adding this note?"))
				$scope.noteListCtrl.deleteNote($scope.$index);
		}
		else if(confirm("Are you sure to cancel editing? All your changes will be lost.")){
				$scope.noteData = this.backupNoteData;
				this.saveEditing();	
		}
	}

	if(this.isNewlyCreatedNote())
		this.startEditing();
	//If the object is empty expand the form.
	// this.isExpanded = true;
	this.backupNoteData = null;


});

