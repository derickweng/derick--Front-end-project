function showCheck(a){
	var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d"); 
  ctx.clearRect(0,0,1000,1000);   
  ctx.fillStyle="white";
  ctx.font = "80px 'Microsoft Yahei'";  
	ctx.fillText(a,0,100);
}
var code ;    
function createCode(){       
    code = "";      
    var codeLength = 4;
    var selectChar = new Array(1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');      
    for(var i=0;i<codeLength;i++) {
       var charIndex = Math.floor(Math.random()*60);      
      code +=selectChar[charIndex];
    }      
    if(code.length != codeLength){      
      createCode();      
    }
    showCheck(code);
}
          
function validate () {  
    var nameCode=document.getElementById('name');
    var passCode=document.getElementById('password'); 
    var InCode=document.getElementById("indetCode");
    var aLogin=document.getElementById("login");
    var inputCode = InCode.value.toUpperCase();
    var codeToUp=code.toUpperCase();
    if(inputCode.length <=0||nameCode.value.length<=0||passCode.value.length<=0) {
      var cureStyle = parseInt( getStyle(aLogin, 'top') ); 
      document.getElementById("indetCode").setAttribute("placeholder","请输入验证码");
      nameCode.setAttribute("placeholder","请输入账号");
      passCode.setAttribute("placeholder","请输入密码");
      shake(aLogin,'top',cureStyle);
      createCode();
      return false;
    }
    if(inputCode != codeToUp ){
      var cureStyle = parseInt( getStyle(aLogin, 'top') ); 
      document.getElementById("indetCode").value="";
      document.getElementById("indetCode").setAttribute("placeholder","验证码错误");
      shake(aLogin,'top',cureStyle);
      createCode();
      return false;
    }
    else {
       document.getElementById("val_btn").setAttribute("value","正在登录中。。。");
       document.getElementById("login").submit();
       document.getElementById("val_btn").disabled=true;
      return true;
    }

}

function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }

function shake ( obj, attr,pos,endFn ) {
  
  var arr = [];     
  var num = 0;
  var timer = null;
    
  for ( var i=20; i>0; i-=2 ) {
    arr.push( i, -i );
  }
  arr.push(0);
    
  clearInterval( obj.shake );
  obj.shake = setInterval(function (){
    obj.style[attr] = pos + arr[num] + 'px';
    num++;
    if ( num === arr.length ) {
      clearInterval( obj.shake );
      endFn && endFn();
    }
  }, 50);
}
