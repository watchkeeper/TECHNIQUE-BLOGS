var fs=require('fs')
fs.exists('./',(flag)=>{
	console.log(flag)
})
fs.readdir('./',(err,files)=>{
	console.log(files)
})