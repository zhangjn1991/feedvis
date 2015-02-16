angular.module('feedVisApp')
.controller('NoteListCtrl', function($scope){
	var newDate = new Date(1422921600*1000);
	this.allNoteData = [
		{
			goalId:2,
			date: newDate,
			activity:"Test Activity 2",
			result:"Test Result"
		},
		{
			goalId:3,
			date: newDate,
			activity:"Test Activity",
			result:"Test Result"
		}

	]
	this.addNewNote = function(){		
		this.allNoteData.push({
			date: new Date()			
		});
	}
	this.deleteNote = function(index){
		this.allNoteData.splice(index,1);
	}

});

