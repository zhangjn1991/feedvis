angular.module('feedVisApp')
.controller('GlobalCtrl', function($scope){
	
	var newDate = new Date(1422921600*1000);
	this.allGoalData = [
		{
			title:"Test Title 1",
			date: newDate,
			desc:"Test Activity 2",
			id:"1"
		},
		{
			title:"Test Title 2",
			date: newDate,
			desc:"Test Activity 2",
			id:"2"
		},
		{
			title:"Test Title 3",
			date: newDate,
			desc:"Test Activity 2",
			id:"3"
		},
		{
			title:"Test Title 4",
			date: newDate,
			desc:"Test Activity 2",
			id:"4"
		}

	]
});

