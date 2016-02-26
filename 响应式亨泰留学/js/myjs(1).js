$(document).ready(function(){
	$(window).scroll(function (){
		autoPlay($('#pageTwo'),$('#pageTwo .row'),300);
		autoPlay($('#pageThree'),$('#pageThree .row .col-md-3'),500);
		autoPlay($('#pageFive'),$('#pageFive .img-group .row'),300);
		autoPlay($('#pageSix'),$('#pageSix  .row'),300);
		if ($('#pageTwo').offset().top-$(window).height()-$(window).scrollTop()<-300)
		{
			$('#scrolltoTop').fadeIn();
			$('nav').addClass('navbar-fixed-top');
		}
		else{
			$('#scrolltoTop').fadeOut();
			$('nav').removeClass('navbar-fixed-top');
		}

	});
		$('#scrolltoTop').click(function (){
			$('html,body').animate({scrollTop:'0'},400);
		})
	function autoPlay(Parent,name,time){
		if (Parent.offset().top-$(window).height()-$(window).scrollTop()<-300)
		{
			$('.spinner').fadeOut(time*5);
			name.eq(0).fadeIn(time,function showAli(){$(this).next().fadeIn(time,showAli)});	
		}
	};

})

