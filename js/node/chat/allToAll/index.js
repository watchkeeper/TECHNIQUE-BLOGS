const io = require('socket.io')()

const room = []
const users = []

const group = io.of('group').on('connection',(socket)=>{

	socket.on('come_in',(user)=>{
		socket.emit('comie_in_info',`${user}已经链接服务器`)
	})
	socket.on('order_room',(user,order)=>{
		room.push(order)
		users.push(user)
		// console.log(room)
		// console.log(users)
		/*加入聊天室*/
		socket.join(order)
		/*通知其他人我来了*/
		socket.broadcast.to(order).emit('user_info',`好友${user}加入了聊天室,快开始吧!`)
		socket.emit('order_room_info',`${user}加入了聊天室${order}!!`)
		/*选择聊天室后才能监听信息*/
		socket.on('chat',(user,info,time)=>{
			socket.emit('chat_info',`已经发送信息!`)
			/*所有人都能够看到*/
			group.in(order).emit('get_info',`${time} ${user}:${info}`)
		})
	})

})
io.listen(3000)