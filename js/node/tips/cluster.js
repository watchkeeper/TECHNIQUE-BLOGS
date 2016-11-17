/*establish son processes and they will run the code too why*/
const cluster = require('cluster')
const os = require('os')

const cpus = os.cpus().length

if(cluster.isMaster){
	let [master] = []
	for(let i=0 ; i<cpus-2; i++){
		master = cluster.fork()
	}
	cluster.on('fork',(worker)=>{
		console.log(`master fork a worker : ${worker.id}  pid is ${worker.process.pid}`)
	})
	cluster.on('online',(worker)=>{
		console.log(` worker online : ${worker.id}  pid is ${worker.process.pid}`)
	})
	cluster.on('listening',(worker,address)=>{
		console.log(` worker online : ${worker.id}  pid is ${worker.process.pid} and address msg :${address.address}:${address.port}`)
	})
	cluster.on('disconnect',(worker)=>{
		console.log(` worker disconnect : ${worker.id}  pid is ${worker.process.pid}`)
	})
	cluster.on('exit',(worker)=>{
		console.log(` worker exit : ${worker.id}  pid is ${worker.process.pid}`)
	})
	master.on('message',(msg)=>{
		console.log(msg)
	})
	master.send("Come on my sons!!! I am ready!!!")

}else{
	console.log('I am son.....so weak.....')
	process.send('I am coming our great king')
	process.on('message',(msg)=>{
		console.log(msg)
	})
}


