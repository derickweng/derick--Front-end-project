$(document).ready(function(){
		var $oban=$("#banner").find(".img-list");
		var len=$oban.length;
		  var $nav=$("#banner").find(".jsDot a");
		  var index=0;
		  var timer;
		  function showImg(index){
		   $oban.eq(index).addClass("active").siblings().removeClass("active");
			$nav.eq(index).addClass("current").siblings().removeClass("current");
		  }
		  function player(){
		    timer=setInterval(function() {
		    	index++;
		    	index%=len;
		    	showImg(index)
		    },3000)
		  }
		$nav.click(function(){
		  	index=$(this).index();
		  	showImg(index);
		  })
		$oban.hover(function(){clearInterval(timer)},function(){player()});
		$nav.hover(function(){clearInterval(timer)},function(){player()});
		   player();
})



