angular.module('feedVisApp')
.controller('MenuCtrl', function(){

	this.isMenuVisible = false;
	this.toggleMenuVisible = function(){
		this.isMenuVisible = !this.isMenuVisible;
	}
});

