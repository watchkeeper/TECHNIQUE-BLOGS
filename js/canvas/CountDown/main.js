/*还有性能还是有问题我日*/
var WINDOW_WIDTH = 1200
var WINDOW_HEIGHT = 600
var RADIUS = 8
var PADDING_LEFT = 100
var PADDING_TOP = 150
var RUB = 0.7
/*他这个是倒计时,但是我这里就写成时间了*/
// var DEADLINE = new Date(2017,0,1,0,0,0)
var NOW
//看时间变化与否的
var last_h_g ,last_h_s,last_m_g,last_m_s,last_s_g,last_s_s

var balls = []
var color = ['red','yellow','blue','pink','black','purple','gray','green','orange','hotpink']

window.onload = function(){
	var can = document.getElementById('canvas')
	var c = can.getContext('2d')

	can.width = WINDOW_WIDTH
	can.height = WINDOW_HEIGHT

	setInterval(function(){
		render(c)
	},20)
}
function render(c){ 
	c.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
	NOW = new Date()
	var h = NOW.getHours()
	var m = NOW.getMinutes()
	var s = NOW.getSeconds() 

	if(h%10!=last_h_g){
		last_h_g = h%10
		console.log('last_h_g')
		addBall(PADDING_LEFT+8*(RADIUS*2+1),PADDING_TOP,parseInt(h%10))
		boomBall(c)
	}
	if(parseInt(h/10)!=last_h_s){
		last_h_s = parseInt(h/10)
		console.log('last_h_s')
		addBall(PADDING_LEFT,PADDING_TOP,parseInt(h/10))
		boomBall(c)
	}
	if(parseInt(s/10)!=last_s_s){
		last_s_s = parseInt(s/10)
		console.log('last_s_s')
		addBall(PADDING_LEFT+40*(RADIUS*2+1),PADDING_TOP,parseInt(s/10))
		boomBall(c)
	}
	if(s%10!=last_s_g){
		last_s_g = s%10
		console.log('last_s_g')
		addBall(PADDING_LEFT+48*(RADIUS*2+1),PADDING_TOP,parseInt(s%10))
		boomBall(c)
	}
	if(parseInt(m/10)!=last_m_s){
		last_m_s = parseInt(m/10)
		console.log('last_m_s')
		addBall(PADDING_LEFT+20*(RADIUS*2+1),PADDING_TOP,parseInt(m/10),c)
		boomBall(c)
	}
	if(m%10!=last_m_g){
		last_m_g = m%10
		console.log('last_m_g')
		addBall(PADDING_LEFT+28*(RADIUS*2+1),PADDING_TOP,parseInt(m%10),c)
		boomBall()
	}


	renderDigit(PADDING_LEFT,PADDING_TOP,parseInt(h/10),c)
	renderDigit(PADDING_LEFT+8*(RADIUS*2+1),PADDING_TOP,parseInt(h%10),c)
	renderDigit(PADDING_LEFT+16*(RADIUS*2+1),PADDING_TOP,parseInt(10),c)
	renderDigit(PADDING_LEFT+20*(RADIUS*2+1),PADDING_TOP,parseInt(m/10),c)
	renderDigit(PADDING_LEFT+28*(RADIUS*2+1),PADDING_TOP,parseInt(m%10),c)
	renderDigit(PADDING_LEFT+35*(RADIUS*2+1),PADDING_TOP,parseInt(10),c)
	renderDigit(PADDING_LEFT+40*(RADIUS*2+1),PADDING_TOP,parseInt(s/10),c)
	renderDigit(PADDING_LEFT+48*(RADIUS*2+1),PADDING_TOP,parseInt(s%10),c)

	for(var p=0;p<balls.length;p++){
		balls[p]['x'] += balls[p]['vx']
		balls[p]['y'] += balls[p]['vy']
		balls[p]['vy'] += balls[p]['g']
		if(balls[p]['y']>=WINDOW_HEIGHT-RADIUS){
			balls[p]['vy'] = -balls[p]['vy']*balls[p]['rub']
		}
		// var cnt = 0
		// if(balls[p]['x']<=WINDOW_WIDTH+RADIUS || balls[p]['x']>=0-RADIUS){
		// 	balls[cnt++] = balls[p]
		// }
	}
	balls.pop()
} 
function boomBall(c){
	// console.info(balls)
	loop()
	function loop(){
		requestAnimationFrame(loop)
		for(var p=0;p<balls.length;p++){
			c.beginPath()
			c.fillStyle = balls[p]['color']
			c.arc(balls[p]['x'],balls[p]['y'],RADIUS,0,2*Math.PI)
			c.fill()
			c.closePath()
		}

	}
}
/*这里只是添加小球,因为渲染要拿出来才行,那个是一秒一次,渲染要连续,不能同个方法*/
function addBall(x,y,num){
	for(var i=0;i<digit[num]['length'];i++){
		for(var j=0;j<digit[num][j]['length'];j++){
			if(digit[num][j][i]==1){
				var ball = {
					x:x+j*(2*RADIUS+1),
					y:y+i*(2*RADIUS+1),
					/*-4--4的随机速度*/
					vx:5*(Math.random()*Math.pow(-1,Math.round(Math.random()*1000))),
					/*抛出时候给向上一个抛物线更加帅气*/
					vy:-4,
					g:0.5*Math.random(),
					color:color[Math.floor(Math.random()*color.length)],
					rub:RUB
				}
				balls.push(ball)
			}
		}
	}
}

function renderDigit(x,y,num,c){
	for(var i=0;i<digit[num]['length'];i++){
		for(var j=0;j<digit[num][i]['length'];j++){
			if(digit[num][i][j]==1){
				c.beginPath()
				c.fillStyle = 'yellow'
				c.arc(x+j*(2*RADIUS+1),y+i*(2*RADIUS+1),RADIUS,0,2*Math.PI,false)
				c.fill()
				c.closePath()
			}
		}
	}
}