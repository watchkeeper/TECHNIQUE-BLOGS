const d = require('domain')

//for deal with error easily
//显示
// const one = d.create()
// const assert = require('assert')

// one.on('error',(e)=>{
// 	console.log(e)
// 	console.log('Prove it is running......')
// })
// one.run(()=>{
// 	// k
// 	assert.ok(false)
// })
//隐式
// const two = d.create()
// const events = require('events')

// class modle extends events{}

// const fairy = new modle()

// two.on('error',()=>{
// 	console.log('event modules has errors!')
// })
// two.add(fairy)

// fairy.emit('error',function(){})

//compare with try catch
/*同步异常都可以捕获,但是异步异常,try catch无法*/
// try{
// 	setTimeout(()=>{
// 		//这里可以捕获
// 		try{
// 			kkk()
// 		}catch(e){
// 			console.log(e)
// 			console.log('..........')
// 		}
// 	},2000)
// }catch(e){
// 	console.log('try catch got it')
// }
//一个document内部只可以有一个domain,因为只会执行一个啊,但是它其中可以报多个错误啊
const three = d.create()
three.on('error',(e)=>{
	console.log('domain catch errors')
	console.log(e)
})
three.run(()=>{
	setTimeout(()=>{
		kkk()
	},1000)
	jjj
})
