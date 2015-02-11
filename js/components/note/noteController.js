angular.module('feedVisApp')
.controller('NoteCtrl', function($scope){
	
	this.isExpanded = $scope.noteData.goal?false:true;	
	//If the object is empty expand the form.


	this.expand = function(){
		this.isExpanded = true;		
	}

	this.fold = function(){
		this.isExpanded = false;		
	}
});

