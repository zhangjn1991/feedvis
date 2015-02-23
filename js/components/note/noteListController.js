angular.module('feedVisApp')
.controller('NoteListController', function($scope){
	var newDate = new Date();
	this.allNoteData = [
		{
			goalId:2,
			date: newDate,
			activity:"Visit my brother's time-line and comment on all his recent posts.",
			result:"No visible difference yet",
			resultType:0
		},
		{
			goalId:3,
			date: newDate,
			activity:"I mark every political feeds in my post as I don't want to see this.",
			result:"No more political feeds in my current feeds for now.",
			resultType:1
		},
		{
			goalId:1,
			date: newDate,
			activity:"I published some photos to my album",
			result:"There seems to be less photos in my feeds to me",
			resultType:-1
		}


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

