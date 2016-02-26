
	//滚动图
(function($){
	var num=0;
	var aLi=$(' .banner ul li');
	var oUl=$('.banner ul');
	for (var i = 0; i <=aLi.length; i++) {
		aLi.eq(i).css('left',12.42*i+'rem');
	};
	roll();
	oUl.hover(function(){clearInterval(timer)},roll);
	function roll(){
	timer=setInterval(function(){
		num++;
		num%=aLi.length;
		oUl.animate({'left':-12.42*num+'rem'},1000);
		},2000);
	};

    oUl.on('touchstart', function() {clearInterval(timer)});
    oUl.on('touchend', function() {roll()});
        aLi.swipe({
        	swipe:function(event, direction, distance, duration, fingerCount, fingerData) 
        	{
        		if (direction=='right') {
        			clearInterval(timer);
        			num--;
        			if (num<0) num=0;
        			oUl.animate({'left':-12.42*num+'rem'},800);
              	 };
              	 if (direction=='left') {
        			clearInterval(timer);
        			num++;
        			if (num>3) num=3;
        			oUl.animate({'left':-12.42*num+'rem'},800);
              	 };    
            },
             threshold:30
            });  
    })(jQuery);


