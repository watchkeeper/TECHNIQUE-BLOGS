const io = require('socket.io')()

/*证明多个人访问这个文件的时候,是关联的,而不是同时孤立的访问,仅仅就是一份文件,所有数据都是这个文件上发生的*/
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
		/*看看是否连接了那个target用户*/
		if(users[to]){
			socket.emit('chat_info',`用户${to}上线,可以进行聊天`)
			/*用户上线后我在监听信息*/
			socket.on('post',(pFrom,pTo,msg)=>{
				socket.emit('post_info',`${pFrom}发送给${pTo}的信息发送成功!`)
				users[to].emit('get',pFrom,pTo,msg)
			})
		}else{
			socket.emit('chat_info',`用户${to}没有上线`)
		}
	})
})
io.listen(3001)