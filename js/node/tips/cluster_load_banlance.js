/*使用cluster模块来实现node的服务器的负载均衡,当产生每个进程的时候都会来执行这个文件*/
const http = require('http')
const os = require('os')
const cluster = require('cluster')

const cupNum = os.cpus().length
/*主进程用来控制子进程,接受消息*/
if(cluster.isMaster){
	let [master] = []
	for(let i = 0; i<cupNum;i++){
		master = cluster.fork()
		master.on('message',(msg)=>{
			if(msg.memory){
				console.log(`常驻内存是:${msg.memory.rss}`)
				console.log(`总内存数量是:${os.totalmem()}和剩余内存是${os.freemem()}和运行的pid是${msg.pid}`)
			}
			else{
				console.log(msg)
			}
		})
	}
/*子进程用于接受请求,能够监听同一个端口,进来的请求均衡的分配到各个进程*/
}else{
	http.createServer((req,res)=>{
		res.writeHead(200,{"Content-Type":"text/plain"})
		process.send('server run pid is '+process.pid)
		res.end('hello world!')
	}).listen(9090)
	console.log(`子进程正在跑步着`)
	setInterval(()=>{
		process.send({memory:process.memoryUsage(),pid:process.pid})
	},10000)
}

