const events = require('events')
class modle extends events{}
const modle_emitter = new modle()
/*This is just like map*/
const router = (app)=>{
/**模拟微现场操作,,,,,问题总而言之,一个页面,那个polling只能实行一次,再次执行事件报错**/
	//客户页面
	app.get('/client',(req,res)=>{
		res.sendfile('./views/wei_spot/client.html')
	})
	//控制台页面
	app.get('/console',(req,res)=>{
		//初始化全局用户列表
		global.user_lists =[]
		global.count = 0
		res.sendfile('./views/wei_spot/console.html')
	})
	//用户加入console显示用户
	app.get('/spy_user',(req,res)=>{
		modle_emitter.on('test',(msg)=>{
			console.log(msg)
		})
		function sendMsg(user){
			try{
				//这里也是会报错我擦,不清楚什么错,什么setHeader要在send前,但是我没有在其后啊,
				//只有try catch了我才能继续了,管他娘了,继续搞了
				//**麻批,最终发现错误了,这个on,每当/add_user多刷新次,就会被绑定一次,重复了
				modle_emitter.emit('ok',true)
				res.send({errorcode:0,user:user,msg:'spy_user_success',times:0})
			}catch(e){
				//这里总是报错,每当add_user post一次的时候,会触发事件,但是使得这里被执行多次,
				//没执行一次,增加一次触发,可能是导致上述的原因
				console.log("---***---我还是不知道什么错,但是希望一直跑---***---")
			}
		}
		modle_emitter.on('user_coming',sendMsg)
		//此处监听的证明,不是on监听了多次,是多个emit触发,没刷新一次就会多出来emit,用下面还快点
		modle_emitter.on('ok',function(){
			console.log('成功移除一次了!')
			// 移除时候原来是监听的事件和callback都要对才能移除,fuck
			modle_emitter.removeListener('user_coming',sendMsg)
		})

	})
	//client port登陆以后添加用户
	app.post('/add_user',(req,res)=>{
		global.count++
		console.log(`麻批我到这里执行了${global.count}便`)
		try{
			const user = req.body.user
			global.user_lists.push(user)
			console.log(global.user_lists)
			//用此方式有误,第一次ok的,第二次报错,在写之后才setHeader,不是很懂
			/*!!!!最终问题在这里,问什么这个emit,伴随着刷新,会每次多触发一个事件,不是很懂!!!!*/
			modle_emitter.emit('user_coming',user)
			modle_emitter.emit('test','I feel so crazy about this code')
			res.send({errorcode:0,user:user,msg:"add_user succuess"})
		}catch(e){
			console.log("---***---我不知道什么错,但是希望一直跑---***---")
		}
	})
	//client准备
	app.get('/wait_begin',(req,res)=>{
		modle_emitter.on('begin',(msg)=>{
			if(msg){
				res.send({errorcode:0,msg:'可以开始了'})
			}
		})
	})
	//console开始
	app.post('/console_begin',(req,res)=>{
		const flag = req.body.flag
		modle_emitter.emit('begin','flag')
		res.send({errorcode:0,msg:'已经开始!'})
	})
/**模拟微现场操作**/




	/*长轮询和json跨域*/
	app.get('/polling',(req,res)=>{
		res.sendfile('./views/longPolling.html')
	})
	app.get('/pollingDeal',(req,res)=>{
		const num = req.query.num
		let count = 0
		try{
			while(true){
				count++
				let pattern = Math.floor(Math.random()*600000000)
				if(pattern === Number(num)){
					res.send({msg:`${count}次了他们才相遇...`})
				}
			}
		}catch(e){
			console.log('****some erro but still run****')
		}
	})
	//看看jsonp能不能被hold
	app.get('/pollingDealJsonp',(req,res)=>{
		const num = req.query.num
		let count = 0
		while(true){
			count++
			let pattern = Math.floor(Math.random()*600000000)
			if(pattern === Number(num)){
				res.send(`console.info( "I am from back your input is ${num}  ,执行了${count}次数才相遇");linkScriptTag('http://localhost:622/pollingDealJsonp?num=525')`)
			}
		}
		console.log(num)
	})
}
module.exports = router