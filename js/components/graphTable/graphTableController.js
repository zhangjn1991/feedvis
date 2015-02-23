angular.module('feedVisApp')
.controller('GraphTableController', function($scope, $http){
	var self = this;
	$scope.data = [];
	$scope.GlobalController.GraphTableController = this; //temp way to put show all column button

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

	this.showAllColumn = function(){
		this.columnDict.forEach(function(item){item.isColumnVisible = true;});
	}

	$scope.fetchData();

	$('.graph-view-container').on('scroll', function (e) {   	
		$('.side-bar').scrollTop($(this).scrollTop());
		$('.header-bar').scrollLeft($(this).scrollLeft());
		$('.note-bar').scrollLeft($(this).scrollLeft());
	});

});

