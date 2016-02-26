
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

window.onload = function () {
	var aImg = document.getElementsByTagName('img');
	
	for ( var i=0; i<aImg.length; i++ ) {
		aImg[i].style.left = 80+i*110 + 'px';
		var cureStyle = parseInt( getStyle(aImg[i], 'top') );	
		aImg[i].onmouseover = function () {
			
			shake( this, 'top',cureStyle);
		};
	}
};