         function getStyleAttr(obj, attr) {
	if(window.getComputedStyle) { //支持IE9+, 谷歌, 火狐..获取页面元素样式
	return getComputedStyle(obj, null)[attr];
	//var style = window.getComputedStyle("元素", "伪类");
	}else{
		return obj.currentStyle[attr]; //支持IE8-
                     }
}
//封装缓冲运动
//obj元素节点
//attr属性
//target 目标值
//fn 回调函数
//s 毫秒
function move(obj,attr,target,s,fn){
	if(attr=="opacity"){
		target= target*100;
	}
	clearInterval(obj.timer);
	//开启定时器
	obj.timer = setInterval(function(){
		
		//初始值
		if(attr=="opacity"){
			var start = parseFloat(getStyleAttr(obj,attr)* 100);
			start = Math.round(start); //四舍五入
			console.log(start)
		}else{
			var start = parseFloat(getStyleAttr(obj,attr));
		}
		//速度
		var speed = (target-start)/8;
		speed = speed>0? Math.ceil(speed):Math.floor(speed);
		//运动
		if(attr=="opacity"){
		     obj.style.opacity = (start+speed)/100;
		     obj.style.filter = "alpha(opacity=" + (start + speed) + ")";
		}else{
			obj.style[attr]= start+speed+"px";
		}
		if(target==start){
			clearInterval(obj.timer);
			//回调函数
			if(fn){
				fn();
			}
		}		
	},s)
}
