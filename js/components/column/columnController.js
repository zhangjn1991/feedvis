angular.module('feedVisApp')
.controller('ColumnController', function($scope, $http){
	var self = this;
	this.feedsData = [];

	
	this.getFeedsData = function(){
		$http.get('data/feeds.json').success(function(json){
			self.feedsData = json;	
		})
	}

	this.getFeedsData();
})