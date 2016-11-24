const io = require('socket.io')()
//一个管理者多个users
const users = {}
const manager = {}

io.on('connect',(socket)=>{
	socket.on('comein',(user)=>{
		console.log(user)
		/*若是管理员连接*/
		if(user=='modle'){
			socket.emit('comein_info','管理员${user}已经登录啦')
			manager['modle'] = socket
			socket.on('toUser',(backUser)=>{
				console.log(`准备向${backUser}发送信息`)
				socket.emit('toUser_info',`向${backUser}建立连接成功!`)
				socket.on('tell_user',(msg,tell_user)=>{
					if(users[tell_user]){
						users[tell_user].emit('get_info',`管理员modle:${msg}`)
					}else{
						console.log(`${tell_user}不存在活着没上线`)
					}
				})
			})
		}
		/*其他用户连接*/
		else{
			console.log(`${user}已经连接到服务器!`)
			/*保存通信信道*/
			users[user] = socket
			socket.emit('comein_info',`${user}和管理员的通信线路已经建立,可以开始聊天了`)
			socket.on('chat',(fromUser,message)=>{
				socket.emit('chat_info',`${fromUser},你的信息发送成功!`)
				if(!manager['modle']){
					console.log('管理员没有登录')
				}else{
					manager['modle'].emit('get_info',fromUser,message)
				}
			})
		}
	})
})

io.listen(3000)