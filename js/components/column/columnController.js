angular.module('feedVisApp')
.controller('ColumnCtrl', function($scope, $http){
	var self = this;
	this.feedsData = [];

	this.isGraphVisible = function(){
		return $scope.columnDict[$scope.$index];
	};
	this.getFeedsData = function(){
		$http.get('data/feeds.json').success(function(json){
			self.feedsData = json;	
		})
	}

	this.getFeedsData();
})