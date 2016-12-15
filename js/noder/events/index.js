//一般都是继承这个,下次异步操作可以多采用这种方式
const events = require('events')

class sherlock extends events{}

// const modle = new sherlock()
const modle = new events.EventEmitter()

modle.on('newListener',(e)=>{
	console.log('新的选择器被添加'+e)
})
modle.on('one',(msg)=>{
	console.log(msg)
})
modle.addListener('two',(msg)=>{
	console.log(msg)
})
modle.once('three',(msg)=>{
	console.log(msg)
})
modle.on('removeListener',(e)=>{
	console.log("选择器被移除了 "+e)
})
setTimeout(()=>{
	modle.emit('one','I am one')
	modle.emit('two',"I am two")
	modle.emit('two','I am three')
	modle.removeAllListeners()
	setTimeout(()=>{
		modle.emit('one','I am one')
		modle.emit('two',"I am two")
		modle.emit('three','I am three')
	},500)
},1000)
/*这个没有反应我日麻批*/
modle.removeListener('two',()=>{
	console.log('two is removed!')
})

