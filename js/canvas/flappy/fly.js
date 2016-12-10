'use strict'
/*?多次点击不连跳动的问题?*/
if(document.body.clientWidth < 700 ){
	mechine = 'touchstart'
}else{
	mechine = 'mousedown'
}

window.onload = run()

var can,ctx,can_w,can_h,delta_time,cur_time,fly_flag,fly,continue_click_count
var birdObj,mechine,blockObj,beginFlag,bird_x


function run(){
	console.log('running...')
	init()
	loop()
}
function init(){
	console.log('initial...')
	can = document.getElementById('canvas')
	can_w = can.width
	can_h = can.height
	ctx = can.getContext('2d')
	cur_time = Date.now()
	bird_x = 80
	beginFlag = false
	fly_flag = false
	continue_click_count = 0
	/*bird fly up*/
	can.addEventListener(mechine,function(e){
		// console.log('click')
		beginFlag = true
		fly_flag = true
		// console.log(fly_flag)
		continue_click_count ++
		// console.log('continue_click_count'+continue_click_count)
	})

	birdObj = new bird()
	birdObj.init()

	blockObj = new block()
	blockObj.init()
}
function repaint_background(){
	ctx.clearRect(0,0,can_w,can_h)
	// console.info('sweety')
	ctx.fillStyle = 'deepskyblue'
	ctx.fillRect(0,0,can_w,can_h)
}
function loop(){
	requestAnimationFrame(loop)
	delta_time = Date.now() - cur_time
	cur_time = Date.now()
	// console.info(delta_time)
	repaint_background()
	birdObj.draw()
	blockObj.draw()
}
function bird(){
	this.x
	this.y
	this.color
	this.fly
	this.w
	this.h
	this.fall_speed
	this.reduce_speed

	this.init = function(){
		this.w = 35
		this.h = 35
		this.x = bird_x
		this.y = (can_h-this.h)/2
		this.color = 'yellow'
		this.fall_speed = 4
		this.fly_speed = 6
		fly = this.fly_speed
		/*加速度*/
		this.reduce_speed = 0.2

	}

	this.draw = function(){
		/*点击鼠标时候,这个改成true,就上往上了*/
		if(fly_flag){
			fly -= this.reduce_speed
			this.y -= fly
			/*还没上升完又点击了,应该连续跳动*/
			if(continue_click_count>1){
				fly = this.fly_speed
				continue_click_count--
			}
			if(fly<=0){
				fly_flag=false
				fly = this.fly_speed
				/*上升完了,又是一个点击轮回*/
				continue_click_count = 0
			}
		}else{
			this.y +=this.fall_speed
		}
		ctx.fillStyle = this.color
		ctx.fillRect(this.x,this.y,this.w,this.h)
		/*落出屏幕*/
		if(this.y>can_h+this.h){
			this.y = (can_h-this.h)/2
		}
	}
}

function block(){
	this.bird
	this.x
	this.y
	this.w
	this.h1
	this.h2
	this.distance
	this.color
	this.random_percent
	this.speed
	this.init = function(){
		this.bird = 35
		this.distance = this.bird*4
		this.w = this.bird
		/*create block*/
		this.random_percent = (Math.random()*100)/100
		this.h1 = (can_h-this.distance)*this.random_percent
		this.h2 = (can_h-this.distance)*(1-this.random_percent)
		this.color = 'green'
		this.x = can_w - this.w
		this.speed = 2
	}
	this.draw = function(){
		/*点击屏幕开始飞了*/
		if(beginFlag){
			this.x -=this.speed
			if(this.x<-this.w){
				this.random_percent = (Math.random()*100)/100
				this.h1 = (can_h-this.distance)*this.random_percent
				this.h2 = (can_h-this.distance)*(1-this.random_percent)
				this.x = can_w
			}
		}
		ctx.fillStyle = this.color
		ctx.fillRect(this.x,0,this.w,this.h1)
		ctx.fillRect(this.x,can_h-this.h2,this.w,this.h2)
	}

}