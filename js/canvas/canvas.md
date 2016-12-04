2016/11/23
1,关于基础属性的一个规律;
	(1)普通无前缀的,比如 rect,需要stroke(),需要fill()
		有fillReact  至于要fillStyle(),不需要stroke
		有strokeReact,无法fill,不需要stroke
2,requestAnimationFrame(loop) 按照浏览器重新绘制的频率来逐帧,若setInterval(loop,time)设定时长,而浏览器的显示频率是16.7ms,显示一次,如果time设定的少于16.7,那么在这个间隙就会出现卡帧,空白...不流畅
3,context.save()保存当前的context的样式,因为下面要进行全局性操作会污染,完毕后再context.restore(),就避免了全局的污染,继续save时候的状态
4,有个怪异的问题,for里面,我循环画arc()会超级卡,估计rect也是,仅仅只能够用画线来搞
5,path,stroke之类画笔,正方形等画出来的东西 requestAnimationFrame会一直一直重新绘制,并且保留原来已经绘制了的,不要试图妄想用这个来改变位置
6,transform(scaleX,斜切X,斜切Y,scaleY,translateX,translateY),用来改变位置,但是也是在前一个的基础上新添加一个沃日,实际上也就是包含scale,translate和rotate了,都是复制型的移动
7,麻批,canvas的绘制也fuck的分为了像素级别的绘制和路径的绘制[路径绘制一定一定要注意beginPath!!!!!],像素级别的是fillRect(),不需要stroke(),而路径级别的绘制,就是拿着ps的钢笔工具在描点或描圆形,正方形,然后连接起来用线,要分割的话用的是 beginPath()或者closePath()====>现在研究像素级别的比如image和fillRect等的移动和path路劲的移动
8,对于图片来说哈:直接使用坐标加一直重新绘制来移动,也是会绘制出多个img,所以,看来背景是也要实时的重绘
	附带图片的方法 context.drawImage(
		img,
		对于图片的开始裁剪x,
		对于图片的开始裁剪y,
		对于图片的结束裁剪x,
		对于图片的结束裁剪y,
		图片对于canvas的x,
		图片对于canvas的y,
		在画布上的大小x,
		在画布上的大小y
		)
9,使得原件产生动画效果:而不是一直延续着绘制:
	每次绘制的时候,不仅仅是绘制新的动画效果,下一帧,还要清除前一帧,那么,就是清除背景上所有东西,每次都是全部内容的重新渲染,
	所以,在用canvas的requestAnimationFrame()制作动画时候,first step就是画一个背景,先每次都重绘背景,就动起来了.
10,css3 calc()  
	.fuck{
		width: calc(100%-100px)  需要注意的是calc前面和属性之间有一个空格,属性的计算值带有单位
	}
11,看吧,save和restore的作用出来了,,,和beginPath和closePath区分开了吧:
	1,beginPath  closePath就是路径绘制时候,关闭路径使得下个地方不被影响的,每个单独需要样式的地方都要用,不然乱的很
	2,save是保存之上的context的样式,因为下面做诸如lineCap  strokeStyle 或者 fillStyle时候,是全局的,我仅仅是这个地方需要,
		下个地方我要之前的,再使用restore就好了[fuck,还是没有体会到]

12,canvas的渲染模式是实时渲染不是保留模式,每一次都重新全部绘制,原来理解成保留模式去了

13,strokeRect出来的矩形不能设定填充色 , 老子这个sb,本来就是透明的
14,context.save() 和restore()是对画布状态的保存我日,比如旋转,缩放,平移,透明等,像fillStyle和strokeStyle是当前的形状,
	他们自然不求作用了
15.transform里面的translate transform和scale rotate画一个的话都是先用属性在话画,要用save,restore避免对画布操作影响后面