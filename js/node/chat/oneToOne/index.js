/*socket.io without http server*/
const io = require('socket.io')()


io.on('connection',(socket)=>{
	console.log('有人链接了...')
	let chater = {
		half:'',
		half_:''
	}
	socket.on('chat',(msg)=>{
		chater.half = msg.self
		chater.half_ = msg.wither
		/*
		主动发起者id和被动接受者id成一个聊天室,唯一标志的聊天室
		[这样弄会有问题,就是下面的on.agree中的chat_name异步,总是得不到沃日,导致不在一个聊天室]
		*/
		chat_name = `${chater.half}_${chater.half_}`
		console.log(`${chat_name}号聊天室`)
		socket.emit('chat_info',`${chat_name}号聊天室已经创建`)
		socket.join(chat_name)
		/*触发被勾搭者*/
		console.log(`被勾搭者:${chater.half_}`)
		/*这个是在所有的里面触发寻找,socket对象的emit和on都是单一的我擦,谁来返回给谁*/
		io.emit(chater.half_,{chater:chater.half})
	})
	//某个过程的层级嵌套要对,放在chat内是要chat触发了才监听,而受邀请者是不触发chat就要监听这个的
	socket.on('agree',(msg)=>{
		console.log(msg)
		socket.join(`${chat_name}号聊天室`)
		socket.emit('agree_info',`您已经在聊天室:${chat_name},可以开始玩了`)
	})
})

io.listen(3000)