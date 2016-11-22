const io = require('socket.io')()

const users = {}

io.of('/chat').on('connection',(socket)=>{
	console.log('和客户端连接已经建立')

	/*用户连接加入列表*/
	socket.on('comein',(from,msg)=>{
		console.log(msg)
		users[from] = socket
		socket.emit('comein_info',`用户${from}加入成功`)
	})

	socket.on('chat',(from,to,msg)=>{
		console.log(msg)
		/*每个用户有单一的通信的信道,保存信道*/
		if(users[to]){
			socket.emit('chat_info',`用户${to}上线,可以进行聊天`)
		}else{
			socket.emit('chat_info',`用户${to}没有上线`)
		}
	})
})
io.listen(3001)