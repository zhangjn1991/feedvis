angular.module('feedVisApp')
.controller('GraphTableCtrl', function($scope, $http){
	var self = this;
	$scope.data = [];

	this.columnDict = [];

	$scope.fetchData = function(){
		$http.get('data/test.json').success(function(json){
			$scope.data = json;
			self.columnDict = _.map($scope.data, function(){return {isGraphVisible:true, isColumnVisible:true}});
		})
	}

	this.isGraphVisible = function(index){
		return this.columnDict[index].isGraphVisible;
	};

	this.isColumnVisible = function(index){
		return this.columnDict[index].isColumnVisible;
	};

	this.setGraphVisible = function(isVisible,index){
		this.columnDict[index].isGraphVisible = isVisible;
	};

	this.setColumnVisible = function(isVisible,index){
		this.columnDict[index].isColumnVisible = isVisible;	
	}

	$scope.fetchData();

	$('.graph-view-container').on('scroll', function (e) {   	
		$('.side-bar').scrollTop($(this).scrollTop());
		$('.header-bar').scrollLeft($(this).scrollLeft());
		$('.note-bar').scrollLeft($(this).scrollLeft());
	});

});

