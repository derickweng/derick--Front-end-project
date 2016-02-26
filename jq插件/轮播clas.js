(function ($) {
   $.fn.ClassSwitch=function(options){
     var defaults={
	     'animateTime':'3000',
	 }
   var settings=$.extend({},defaults,options);
   return this.each(function(){
	      var obj=$(this),
		   antime=settings.animateTime,
		   $oban=obj.find(".img-list"),
		   len=$oban.length,
		   $nav=obj.find(".jsDot a"),
		   index=0,
		   timer;
		  $nav.click(function(){
		  	index=$(this).index();
			showImg(index);
		}); 
		  $oban.hover(function(){clearInterval(timer)},function(){player()});
		  $nav.hover(function(){clearInterval(timer)},function(){player()});
		   player();
	   }); 
   }
   //私有方法
    function showImg(index){ 	
		$oban.eq(index).addClass("active").siblings().removeClass("active");
		$nav.eq(index).addClass("current").siblings().removeClass("current");
		}
	function player(){
		 timer=setInterval(function(){
		    	index++;
		  		index%=len;
		    	showImg(index)},antime)
	}
   //运行
   $(function(){
		$("[data-ClassSwitch]").ClassSwitch();
	})
})(jQuery);
/* 笔记 配合css3 */