$(function(){
	// header 切换学校
	(function(){
		$(' #header .school').children().click(function(){
			$('#header .school').children().removeClass('active');
			$(this).toggleClass("active");

		});
	})();

	//search栏 搜索切换
	(function(){
		var aLi=$('#search li');
		var oText=$('.search_bar').find('form .text');
		var arrText = 
		[
			'例如：香港 或 从化',
			'例如：英语 吉他 钢琴',
			'例如：菠萝鸡套餐',
			'例如：新款长袖打底衫',
		];
		var textNum=0;
		oText.val(arrText[0]);
		aLi.each(function(index)
		{
		 $(this).click(function()
		 	{
				aLi.attr('class','');
				$(this).attr('class','active');
				oText.val(arrText[index]);
				textNum=index;
			})
		});
		oText.focus(function()
		{			
			if($(this).val()==arrText[textNum])
			{
				$(this).val('');
			}
		});
		oText.blur(function()
		{
			if($(this).val()=='')
			{
				$(this).val(arrText[textNum]);
			}
		});
	})();

	//update 滚动
	(function(){
		var oUl=$('.search_update ul');
		var update='';
		function autoUpdate(){timer=setInterval(roll,2000)};
		autoUpdate();
		oUl.hover(function(){clearInterval(timer)},autoUpdate);

		function roll()
		{
					
			oUl.load('update.php',function(response,status,xhr)
				{
			 		var json=($.parseJSON(response));
			 		var num=parseInt((json.length)*Math.random());
					update='<li>'+'<a href="#" class="name">'+json[num].User+'</a>'+'<p href="#" class="date">'+json[num].posttime+'分钟前</p>'+'<a href="#" class="behave">购买了'+json[num].content+'</a>'+'</li>';
					$(this).html(update);     
			  	});	
			 oUl.attr("onerror",function(){
			 	oUl.replaceWith('服务器请求失败');
			 });
		};		
	})();

	//广告图片滚动
	(function(){
		var pic='';
		var tab='';
		var n=0;
		$(' .section_pic').load('ad_pic.php',function(response,status,xhr){

			var arrImg=($.parseJSON(response));
			for (var i = arrImg.length - 1; i >= 0; i--) 
			{
				pic+='<img'+' '+'src='+'"'+arrImg[i].picpath+'"'+'/>';
				var num=i+1;
				tab+='<li>'+'<span>'+num+'</span>'+'</li>';
			};
			$(' .section_tab').html(tab);
			$(' .section_pic').html(pic);	
			count=arrImg.length;
			$(' .section_pic img:not(:first-child)').css('display','none');
			$(".section_tab li").click(function() 
			{
				var i = $(this).text() -1;
				$(".section_pic img").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
				$(".section_tab li").removeAttr("class");
				$(this).toggleClass("on");
			});		
			autoPic();
			function autoPic()
			{
				timerPic=setInterval(function()
					{
						n++;
						n%=count;
						$(" .section_tab li").eq(n).trigger('click');
					},3000);
			};	
		});
		$('.section_pic').attr("onerror",function (){
			$('.section_pic').replaceWith('服务器接口错误');
		});					
	})();

	//recommend 推荐栏目
		(function (){
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = [ '拍浪运动-狮威sisw', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var iNow = 0;
		var timer = null;
		
		fnFade();
		
		aOlLi.click(function (){
			iNow = $(this).index();
			fnFade();
		});
		oDiv.hover(function (){ clearInterval(timer); }, autoPlay);
		
		function autoPlay() {
			timer = setInterval(function () {
				iNow++;
				iNow%=arr.length;
				fnFade();
			}, 2000);
		}
		autoPlay();
		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != iNow ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');

				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).addClass('active');
				}
			});
			oP.text(arr[iNow]);
		}
	})();
	//login登陆栏 注册
	(function(){
	$('#reg, #login, #loading').hide();
	$('#member, #logout').hide();
	
	if ($.cookie('user')) {
		$('#member, #logout').show();
		$('#reg_a, #login_a').hide();
		$('#member').html($.cookie('user'));
	} else {
		$('#member, #logout').hide();
		$('#reg_a, #login_a').show();
	};
	
	$('#logout').click(function () {
		$.removeCookie('user');
		window.location.href = 'index.html';
	});
	
	$('#loading').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 180,
		height : 100,
	});
	
	$('#reg_a').click(function () {
		$('#reg').dialog('open');
	});

	$('#reg').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 320,
		height : 340,
		buttons : {
			'提交' : function () {
				$(this).submit();
			}
		}
	}).buttonset().validate({
	
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url : 'add.php',
				type : 'POST',
				beforeSubmit : function (formData, jqForm, options) {
					$('#loading').dialog('open');
				},
				success : function (responseText, statusText) {
					if (responseText) {
						$('#loading').css('background', 'url(images/success.gif) no-repeat 20px center').html('数据新增成功...');
						$.cookie('user', $('#user').val());
						setTimeout(function () {
							$('#loading').dialog('close');
							$('#reg').dialog('close');
							$('#reg').resetForm();
							$('#reg span.star').html('*').removeClass('succ');
							$('#loading').css('background', 'url(images/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html($.cookie('user'));
						}, 1000);
					}
				},
			});
		},
	
		showErrors : function (errorMap, errorList) {
			var errors = this.numberOfInvalids();
			
			if (errors > 0) {
				$('#reg').dialog('option', 'height', errors * 20 + 340);
			} else {
				$('#reg').dialog('option', 'height', 340);
			}
			
			this.defaultShowErrors();
		},
		
		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
	
		errorLabelContainer : 'ol.reg_error',
		wrapper : 'li',
	
		rules : {
			user : {
				required : true,
				minlength : 2,
				remote : {
					url : 'is_user.php',
					type : 'POST',
				},
			},
			pass : {
				required : true,
				minlength : 6,
			},
			email : {
				required : true,
				email : true
			},
			date : {
				date : true,
			},
		},
		messages : {
			user : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
				remote : '帐号被占用！',
			},
			pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
			},
			email : {
				required : '邮箱不得为空！',
				minlength : '请输入正确的邮箱地址！',
			},	
		}
	});
	
	$('#date').datepicker({
		changeMonth : true,
		changeYear : true,
		yearSuffix : '',
		maxDate : 0,
		yearRange : '1950:2020',

	});
		
	
	$('#email').autocomplete({
		delay : 0,
		autoFocus : true,
		source : function (request, response) {
			
			var hosts = ['qq.com', '163.com', '263.com', 'sina.com.cn','gmail.com', 'hotmail.com'],
				term = request.term,		
				name = term,				
				host = '',					
				ix = term.indexOf('@'),		
				result = [];				
				
				
			result.push(term);
			if (ix > -1) {
				name = term.slice(0, ix);
				host = term.slice(ix + 1);
			}
			
			if (name) {
				var findedHosts = (host ? $.grep(hosts, function (value, index) {
						return value.indexOf(host) > -1
					}) : hosts),
					findedResult = $.map(findedHosts, function (value, index) {
					return name + '@' + value;
				});
				
				result = result.concat(findedResult);
			}
			
			response(result);
		},	
	});

	
	//login登录
		$('#login_a').click(function () {
		$('#login').dialog('open');
	});

	$('#login').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 320,
		height : 340,
		buttons : {
			'登录' : function () {
				$(this).submit();
			}
		}
	}).validate({
	
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url : 'login.php',
				type : 'POST',
				beforeSubmit : function (formData, jqForm, options) {
					$('#loading').dialog('open');
				},
				success : function (responseText, statusText) {
					if (responseText) {
						$('#loading').css('background', 'url(images/success.gif) no-repeat 20px center').html('登陆成功...');
						$.cookie('login_user', $('#login_user').val());
						setTimeout(function () {
							$('#loading').dialog('close');
							$('#login').dialog('close');
							$('#login').resetForm();
							$('#loading').css('background', 'url(images/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html($.cookie('login_user'));
						}, 1000);
					}
				},
			});
		},
	
		showErrors : function (errorMap, errorList) {
			var errors = this.numberOfInvalids();
			
			if (errors > 0) {
				$('#login').dialog('option', 'height', errors * 20 + 340);
			} else {
				$('#login').dialog('option', 'height', 340);
			}
			
			this.defaultShowErrors();
		},
		
		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;');
		},
	
		errorLabelContainer : 'ol.login__error',
		wrapper : 'li',
	
		rules : {
			login_user : {
				required : true,
				minlength : 2,
				
			},
			login_pass : {
				required : true,
				minlength : 6,
			},
		},
		messages : {
			login_user : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
			
				
			},
			login_pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
				
			},
		}
		});
	})();

	//最新公告
	(function(){
	$('.notice ol li').mouseover(function(){
		$('.notice ol li').removeClass('active');
		$(this).toggleClass('active');
		});
	})();
	
});
