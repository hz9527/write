//定义常量对象
var normal={
	s_width:function(){
				if(window.innerWidth*0.6>window.innerHeight*0.8){
					return Math.floor(window.innerHeight*0.8)
				}else{return Math.floor(window.innerWidth*0.6)}
		},
	lastTime:0,
	lastPoint:{x:0,y:0},
	lastWidth:-1,
	isMouseDown:false,
	maxWidth:-1,
	minWidth:1,
	color:'#000000'
}
//初始化画布
var canvas=document.getElementById('canvas');
canvas.width=canvas.height=normal.s_width();
normal.maxWidth=canvas.width/30;
var ctx=canvas.getContext('2d');
//获取颜色
var color=document.getElementById('color');
color.onchange=function(){
	normal.color=color.value;
}
//清除画布
var btn=document.getElementById('btn');
btn.onclick=function(){
	ctx.clearRect(0,0,canvas.width,canvas.width);
	drawbg()
}
//绘制背景
function drawbg(){
	ctx.save();
	ctx.strokeStyle = "rgb(230,11,9)";
	ctx.beginPath();
	ctx.moveTo(0,canvas.width/2);
	ctx.lineTo(canvas.width,canvas.width/2);
	ctx.moveTo(canvas.width/2,0);
	ctx.lineTo(canvas.width/2,canvas.width);
	ctx.moveTo(0,0);
	ctx.lineTo(canvas.width,canvas.width);
	ctx.moveTo(0,canvas.width);
	ctx.lineTo(canvas.width,0);
	ctx.closePath();
	ctx.lineWidth=1;
	ctx.stroke();
	ctx.beginPath();
	ctx.rect(3,3,canvas.width-6,canvas.width-6);
	ctx.closePath();
	ctx.lineWidth=6;
	ctx.stroke();
	ctx.restore();
}
//负责判断鼠标被点击，并初始化时间、坐标
canvas.onmousedown=function(){
	var e=window.event||arguments[0];
	/*if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue=false;
	}没必要这么写，因为老IE本来就不支持canvas*/
	e.preventDefault();
	normal.isMouseDown=true;
	normal.lastTime=new Date().getTime();
	normal.lastPoint={x:e.offsetX,y:e.offsetY}
}
//负责判断鼠标放开
canvas.onmouseup=function(){
	var e=window.event||arguments[0];
	e.preventDefault();
	normal.isMouseDown=false;
}
//负责移出判断
canvas.onmouseout=function(){
	var e=window.event||arguments[0];
	e.preventDefault();
	normal.isMouseDown=false;
}
//负责绘制，并记录本次时间，位置
canvas.onmousemove=function(){
	var e=window.event||arguments[0];
	e.preventDefault();
	if(normal.isMouseDown==true){
		var curPoint={x:e.offsetX,y:e.offsetY};
		var curTime=new Date().getTime();
		draw(curPoint,curTime);
		normal.lastPoint=curPoint;
		normal.lastTime=curTime;
	}
}
//绘制方法
function draw(point,curTime){
	ctx.beginPath();
	ctx.moveTo(normal.lastPoint.x,normal.lastPoint.y);
	ctx.lineTo(point.x,point.y);
	ctx.closePath();
	ctx.strokeStyle=normal.color;
	ctx.lineWidth=lineWidth(point,curTime);
	ctx.lineCap='round';
	ctx.lineJoin='round';
	ctx.stroke();
	normal.lastWidth=ctx.lineWidth;
}
//定义线宽
function lineWidth(point,curTime){
	var v=(Math.sqrt((point.x-normal.lastPoint.x)*(point.x-normal.lastPoint.x)+
	(point.y-normal.lastPoint.y)*(point.y-normal.lastPoint.y)))/(curTime-normal.lastTime);
	var lineWidth=0
	if(v>=10){
		lineWidth=normal.minWidth;
	}else if(v<=0.1){
		lineWidth=normal.maxWidth
	}else{
		lineWidth=Math.round(
			(normal.minWidth-normal.maxWidth)/9.9*v+normal.maxWidth-(normal.minWidth-normal.maxWidth)/99
		);
	}
	if(normal.lastWidth!=-1){
		lineWidth=normal.lastWidth*2/3+lineWidth*1/3;
		return lineWidth;
	}else{
		return lineWidth;
	}
}
window.onload=function(){
	drawbg();
}
























