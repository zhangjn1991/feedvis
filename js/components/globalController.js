angular.module('feedVisApp')
.controller('GlobalCtrl', function($scope){
	
	var newDate = new Date();
	this.graphTableCtrl = null;
	this.allGoalData = [
		{
			title:"See more Photos",
			date: newDate,
			desc:"I want to see more photo posts in my feeds.",
			id:1
		},
		{
			title:"More brother's posts",
			date: newDate,
			desc:"I want to see more posts from by brother, or even all posts.",
			id:2
		},
		{
			title:"Less Politics",
			date: newDate,
			desc:"I would like to reduce the amount of political posts from my feeds.",
			id:3
		},
		{
			title:"More Technical Post",
			date: newDate,
			desc:"I like to read more post related to technology.",
			id:4
		}

	]
});

