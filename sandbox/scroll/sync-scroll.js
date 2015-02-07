$('.content').on('scroll', function () {
    $('.left').scrollTop($(this).scrollTop());
    $('.top').scrollLeft($(this).scrollLeft());
});

$('.top').on('scroll', function () {    
    $('.content').scrollLeft($(this).scrollLeft());
});

$('.left').on('scroll', function () {    
    $('.content').scrollTop($(this).scrollTop());
});

$(".content div").hover(
	function(){
		$(".content").css({"overflow":"hidden"})
	},
	function(){
		$(".content").css({"overflow":"scroll"})
	}

)