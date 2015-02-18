angular.module('feedVisApp')
.controller('NoteListCtrl', function($scope){
	var newDate = new Date(1422921600*1000);
	this.allNoteData = [
		// {
		// 	goalId:2,
		// 	date: newDate,
		// 	activity:"Test Activity 2",
		// 	result:"Test Result",
		// 	resultType:0
		// },
		// {
		// 	goalId:3,
		// 	date: newDate,
		// 	activity:"Test Activity",
		// 	result:"Test Result",
		// 	resultType:-1
		// },
		// {
		// 	goalId:1,
		// 	date: newDate,
		// 	activity:"Test Activity",
		// 	result:"Test Result",
		// 	resultType:1
		// }


	]
	this.addNewNote = function(){		
		this.allNoteData.push({
			date: new Date(),
			resultType:0,
			goalId:-1	
		});
	}
	this.tryDeleteNote = function(index){
		var willDelete = confirm("Are you sure to delete this note? This operation cannot be undone.");
		if(willDelete)
			this.deleteNote(index);
	}
	this.deleteNote = function(index){
		this.allNoteData.splice(index,1);
	}

});

