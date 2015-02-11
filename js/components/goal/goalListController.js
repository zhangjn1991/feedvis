angular.module('feedVisApp')
.controller('GoalListCtrl', function(){
	var newDate = new Date(1422921600*1000);
	this.allGoalData = [
		{
			title:"Test Title",
			date: newDate,
			desc:"Test Activity 2",
		},
		{
			title:"Test Title",
			date: newDate,
			desc:"Test Activity 2",
		},
		{
			title:"Test Title",
			date: newDate,
			desc:"Test Activity 2",
		},
		{
			title:"Test Title",
			date: newDate,
			desc:"Test Activity 2",
		}

	]
	this.addNewGoal = function(){		
		this.allGoalData.push({
			date: new Date()
		});
	}
	this.deleteGoal = function(index){
		this.allGoalData.splice(index,1);
	}
});

