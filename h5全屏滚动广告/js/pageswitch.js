(function($){
	var defaults = {
		'container' : '#container',//容器
		'sections' : '.section',//子容器
		'easing' : 'ease',//特效方式，ease-in,ease-out,linear
		'duration' : 1000,//每次动画执行的时间
		'pagination' : true,//是否显示分页
		'loop' : false,//是否循环
		'direction' : 'vertical',//滑动的方向 horizontal,vertical,
		'animateWait' :function(pageNum){}
	};

	var win = $(window),
		container,sections;

	var opts = {},
		canScroll = true;

	var iIndex = 0;
	var pageNum = iIndex;

	var arrElement = [];

	var SP = $.fn.switchPage = function(options){
		opts = $.extend({}, defaults , options||{});

		container = $(opts.container),
		sections = container.find(opts.sections);
		
		sections.each(function(){
			arrElement.push($(this));
		});
		return this.each(function(){
			if(opts.direction == "horizontal"){
			initLayout();
			}

			if(opts.pagination){
				initPagination();
			}
		});
	}

	//滚轮向上滑动事件
	SP.moveSectionUp = function(){
		if(iIndex){
			iIndex--;
			pageNum--;
		}else if(opts.loop){
			iIndex = arrElement.length-1;
			pageNum = arrElement.length-1;
		}
		scrollPage(arrElement[iIndex]);
	};

	//滚轮向下滑动事件
	SP.moveSectionDown = function(){
		if(iIndex<(arrElement.length-1)){
			iIndex++;
			pageNum++;
			if (opts.animateWait&&$.isFunction(opts.animateWait)) {
				opts.animateWait(pageNum);
			};
		}else if(opts.loop){
			iIndex = 0;
			pageNum = 0;
		}
		scrollPage(arrElement[iIndex]);
	};

	//私有方法
	//页面滚动事件
	function scrollPage(element){
		var dest = element.position();
		if(typeof dest === 'undefined'){ return; }
		initEffects(dest,element);
	}

	//重写鼠标滚轮事件
	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);
	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, value));
		if(canScroll){
			if (delta < 0) {
				SP.moveSectionDown();

			}else {
				SP.moveSectionUp();
			}
		}
		return false;
	}
	//添加触屏滑动事件
	$(document).on("touchstart",function TouchStart(e) {
		e.preventDefault();		
		Ystart = event.targetTouches[0].pageY;
	}).on("touchmove", function TouchMove(e) {	
		e.preventDefault();
		Ymove =	event.targetTouches[0].pageY;	
	}).on("touchend", function TouchEnd(e) {
		if (Ystart-Ymove>150) {
			SP.moveSectionDown();
		}else if(Ystart-Ymove<-150){
			SP.moveSectionUp();
		};
		return false;
	});
	
	//横向布局初始化
	function initLayout(){
		var length = sections.length,
			width = (length*100)+"%",
			cellWidth = (100/length).toFixed(2)+"%";
		container.width(width).addClass("left");
		sections.width(cellWidth).addClass("left");
	}

	//初始化分页
	function initPagination(){
		var length = sections.length;
		if(length){

		}
		var pageHtml = '<ul id="pages"><li class="active"></li>';
		for(var i=1;i<length;i++){
			pageHtml += '<li></li>';
		}
		pageHtml += '<div class="down"><div class="down_one"></div><div class="down_second"></div></div></ul>';
		$("body").append(pageHtml);
	}

	//分页事件
	function paginationHandler(){
		var pages = $("#pages li");
		pages.eq(iIndex).addClass("active").siblings().removeClass("active");
	}

	//是否支持css的某个属性
	function isSuportCss(property){
		var body = $("body")[0];
		for(var i=0; i<property.length;i++){
			if(property[i] in body.style){
				return true;
			}
		}
		return false;
	}

	//渲染效果
	function initEffects(dest,element){
		var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
			transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];

		canScroll = false;
		if(isSuportCss(transform) && isSuportCss(transition)){
			var traslate = "";
			if(opts.direction == "horizontal"){
				traslate = "-"+dest.left+"px, 0px, 0px";
			}else{
				traslate = "0px, -"+dest.top+"px, 0px";
			}
			container.css({
				"transition":"all "+opts.duration+"ms "+opts.easing,
				"transform":"translate3d("+traslate+")"
			});
			container.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend",function(){
				canScroll = true;
			});
		}else{
			var cssObj = (opts.direction == "horizontal")?{left: -dest.left}:{top: -dest.top};
			container.animate(cssObj, opts.duration, function(){
				canScroll = true;
			});
		}
		element.addClass("active").siblings().removeClass("active");
		if(opts.pagination){
			paginationHandler();
		}
	}

	//窗口Resize
	var resizeId;
	win.resize(function(){
		clearTimeout(resizeId);
		resizeId = setTimeout(function(){
			reBuild();
		},500);
	});

	function reBuild(){
		var currentHeight = win.height(),
			currentWidth = win.width();

		var element = arrElement[iIndex];
		if(opts.direction == "horizontal"){
			var offsetLeft = element.offset().left;
			if(Math.abs(offsetLeft)>currentWidth/2 && iIndex <(arrElement.length-1)){
				iIndex ++;
				pageNum ++;
			}
		}else{
			var offsetTop = element.offset().top;
			if(Math.abs(offsetTop)>currentHeight/2 && iIndex <(arrElement.length-1)){
				iIndex ++;
				pageNum ++;
			}
		}
		if(iIndex){
			paginationHandler();
			var cuerrentElement = arrElement[iIndex],
				dest = cuerrentElement.position();
			initEffects(dest,cuerrentElement);
		}
	}
	
})(jQuery);