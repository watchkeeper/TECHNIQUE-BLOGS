const child_process = require('child_process')
const assert=require('assert')
const domain = require('domain')

const one = domain.create()
one.on('error',(e)=>{
	console.log(e)
})
one.run(()=>{
	const spawn = child_process.spawn
	const spawn_process = spawn('ls',['../','-l'])
	spawn_process.stdout.on('data',(msg)=>{
		console.log(`stdout data is ${msg}`)
	})
	spawn_process.stderr.on('data',(msg)=>{
		console.log(`error happen ${msg}`)
	})
	spawn_process.on('close',(code)=>{
		console.log(`spawn_process has stoped! and code is ${code}`)
	})
	console.log(`pid of spawn ${spawn_process.pid}`)


	const exec = child_process.exec
	const exec_process = exec('ls -l ../',(err,stdout,stderr)=>{
		try{
			assert.ifError(err)
		}catch(e){
			console.log(e)
		}
		// throw new Error('I am not happy')
		console.log(stdout)
		console.log(`pid of exec ${exec_process.pid}`)
	})
})
