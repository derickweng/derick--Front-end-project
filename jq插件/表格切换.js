(function($){
	$.fn.tableStyle=function(opt){
		var defaults={
			'styleCss' : 'background',
			'evenTable' : 'white',
			'oddTable' : '#999',
			'activeTable' : 'yellow',
		}
	
	var settings=$.extend({},defaults,opt);
	return this.each(function(){
		$table=$(this);
		var style=settings.styleCss;
		var evenTable=settings.evenTable;
		var oddTable=settings.oddTable;
		$table.find('tr:even').addClass(style,evenTable);
		$table.find('tr:odd').addClass(style,oddTable);
		$table.find('tr').bind('mouseover',function(){
			$(this).addClass(style,settings.activeTable).siblings().removeClass(style,'');
		})
	});
	}
	$(function(){
		$("[data-tableStyle]").tableStyle();
	});
})(jQuery);
/* 笔记：还需要css配合效果好些*/