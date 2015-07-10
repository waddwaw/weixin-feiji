//全局变量
var x=0,y=0;
var backKey; //背景钥匙
var zhanji1; //战机
var enemyKey; //敌机钥匙
var bulletKey; //子弹钥匙

var score=0; //分数

//开始游戏
startBtn.onclick=function(){
	
	//清空战场
	box.innerHTML="";
	
	//重置分数
	score=0;
	scoreSpan.innerHTML="分数"+0;

	var num=0;
	//背景图
	box.style.backgroundImage="url(img/gameBg.png)";
	
	//添加背景钥匙
	backKey=setInterval(function(){
		num=num+1;
		box.style.backgroundPositionY=num+"px";
	},30);	
	//隐藏按钮
	startBtn.style.display="NONE";
	
	//添加战机
	zhanji();
	
	//添加子弹，添加子弹钥匙
	bulletKey=setInterval(creatBullet,200);
	
	//
	
	
	
	
	
	
	//添加敌机，添加敌机钥匙
	enemyKey=setInterval(creatEnemy,1000);
	
//	setInterval(function(){
//		var n=Math.random()*(320-34);
//		n=Math.floor(n);
//		creatEnemy("img/e1_1.png",n,2);
//	},500)
//	setInterval(function(){
//		var n1=Math.random()*(320-46);
//		n1=Math.floor(n1);
//		creatEnemy("img/e2_1.png",n1,5);
//	},3000)
//	setInterval(function(){
//		var n2=Math.random()*(320-110);
//		n2=Math.floor(n2);
//		creatEnemy("img/e3_1.png",n2,10);
//	},10000)
	
}
//创建战机
function zhanji(){
	//创建元素
	zhanji1=document.createElement("img");
	zhanji1.src="img/fly.gif";
	zhanji1.style.position="absolute";
	//层级显示，为1
	zhanji1.style.zIndex=1;
	
	box.appendChild(zhanji1);
	//鼠标跟随
	box.onmousemove=function(evt){
		x=evt.pageX-33;
		y=evt.pageY-40;
		//320-66=254
		if(x>254){ x=254;}
		if(x<0){ x=0;}
		//568-80=488
		if(y>488){ y=488;}
		if(y<0){ y=0;}
		
		
		zhanji1.style.left=x+"px";
		zhanji1.style.top=y+"px";
	}
}

//创建子弹
function creatBullet(){
	//创建元素
	var bullet=document.createElement("img");
	bullet.src="img/shot.png";
	
	//为子弹设置标签
	bullet.isBullet=1;
	
	
	//设置位置
	bullet.style.position="absolute";
	bullet.style.left=(x+32)+"px";
	bullet.style.top=y+"px";
	
	//层级显示，为0
	bullet.style.zIndex=0;
	
	box.appendChild(bullet);
	
	
	var num=y;
	bullet.key=setInterval(function(){
		num=num-3;
		bullet.style.top=num+"px";
		//判断是否在父元素中，
		if(num<0){
			if(bullet.parentNode){
				//清除数据
				bullet.parentNode.removeChild(bullet);
			}
			clearInterval(bullet.key);
		}
	},1)
}

////创建敌机
//function creatEnemy(src,left,fast){
//	//添加敌机元素
//	var enemy=document.createElement("img");
//	enemy.src=src;
//	//初始化敌机位置
//	enemy.style.position="absolute";
//	enemy.style.left=left+"px";
//	enemy.style.top="-160px";
//	//添加到容器
//	box.appendChild(enemy);
//	//移动下降
//	var num=-160;
//	setInterval(function(){
//		num=num+1;
//		enemy.style.top=num+"px";
//		
//		if(num>568){
//			if(enemy.parentNode){
//				//清除数据
//				enemy.parentNode.removeChild(enemy);
//			}
//		}
//	},fast)
//}
//创建敌机
function creatEnemy(){
	//添加敌机元素
	var enemy=document.createElement("img");
	
	//判断敌机的类型
	var type=Math.random()*3+1;
	enemy.type=Math.floor(type);
	enemy.src="img/e"+enemy.type+"_1.png";
	
	//获取敌机对象
	var obj=enemyWH(enemy.type);
	
	
	//获取敌机大小
	enemy.w=obj.width;
	enemy.h=obj.heigth;
		
	//初始化敌机位置
	enemy.style.position="absolute";
	//根据不同敌机，获取不能左边距, Math.random()*(a-b)+b;
	var left=Math.random()*(320-obj.width);
	left=Math.floor(left);
	enemy.style.left=left+"px";
	enemy.style.top="-160px";
	
	
	//添加到容器
	box.appendChild(enemy);
	//移动下降
	var num=-160;
	//每一个战机都绑定一个钥匙
	enemy.key=setInterval(function(){
		num=num+1;
		enemy.style.top=num+"px";
		
		if(num>568){
			if(enemy.parentNode){
				//清除数据
				enemy.parentNode.removeChild(enemy);
				clearInterval(enemy.key);
			}
			
		}

		//检测碰撞
		isBoom(enemy);
		
	},obj.speed)
}

//敌机的宽和高
function enemyWH(type){
	switch(type){
		case 1:
			return {width:34, heigth:24, speed:2};
		case 2:
			return {width:46, heigth:60, speed:5};
		case 3:
		 	return {width:110, heigth:164, speed:10};	
		case 4:
		 	return {width:55, heigth:35,speed:1};
	}
	
}

//检测碰撞
function isBoom(enemy){
	
	//获取敌机的大小
	var enemyW=enemy.w;
	var enemyH=enemy.h;
		
	//获取敌机中心点位置
	var enemyX=parseInt(enemy.style.left)+enemyW/2;
	var enemyY=parseInt(enemy.style.top)+enemyH/2;

	//获取战机中心点位置
	var flyX=x+33;
	var flyY=y+40;
	
	//是否碰撞
	if(enemy.tpye == 4)
	{
		console.log(enemy);
	}
	else if(Math.abs(enemyX-flyX)<(enemyW+30)/2){
		if(Math.abs(enemyY-flyY)<(enemyH+40)/2){ 
//			console.log(enemy);
			gameOver();
		}
		
	}
	
	//检测是否被击中
	var bullets=document.getElementsByTagName("img");
	if(enemy.type != 4)
	for(var i=0;i<bullets.length;i++){
		
		//检测是否是子弹
		if(bullets[i].isBullet == 1){
			
			var bulletX=parseInt(bullets[i].style.left)+3;
			var bulletY=parseInt(bullets[i].style.top)+7;
			
			//是否击中
			if(Math.abs(enemyX-bulletX)<enemyW+3 && Math.abs(enemyY-bulletY)<enemyY+7){
				
				//子弹消失
				if(bullets[i].parentNode)
				{
					clearInterval(bullets[i].key);
					bullets[i].parentNode.removeChild(bullets[i]);
					
				}
				
				//分数改变
				score=score+enemy.type*2;
				scoreSpan.innerHTML="分数"+score;
				
				//战机消失
				if(enemy.parentNode){
					
					//更换敌机图片
					enemy.src="img/e"+enemy.type+"_2.gif";
					//敌机停止下降
					clearInterval(enemy.key);
					
					setTimeout(function(){ 
						if(enemy.parentNode){
							enemy.parentNode.removeChild(enemy);
							
						}
					},500)
					
					
				}
				
			}

		}
	}
	
}

//结束游戏
function gameOver(){
	
	//跟换战机图片
	zhanji1.src="img/fly_die.gif";
	
	//释放鼠标
	box.onmousemove="null";
	
	//停止背景滚动
	clearInterval(backKey);
	
	//停止敌机出现
	clearInterval(enemyKey);
	
	//停止发射子弹
	clearInterval(bulletKey);
	
	//停止敌机和子弹下降
	var imgs=document.getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		clearInterval(imgs[i].key);
	}
	
	//重新开始游戏
	startBtn.style.display="block";
	
	
	
}

































