angular.module('feedVisApp')
.controller('MenuCtrl', function(){

	this.isMenuVisible = false;
	this.toggleMenuVisible = function(visible){
		if(visible === undefined)
			this.isMenuVisible = !this.isMenuVisible;
		else
			this.isMenuVisible = visible;
	}
});

