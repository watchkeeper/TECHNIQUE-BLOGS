/*This is just like map*/

const router = (app)=>{
	/*长轮询和json跨域*/
	app.get('/polling',(req,res)=>{
		res.sendfile('./views/longPolling.html')
	})
	app.get('/pollingDeal',(req,res)=>{
		const num = req.query.num
		let count = 0
		while(true){
			count++
			let pattern = Math.floor(Math.random()*600000000)
			if(pattern === Number(num)){
				res.send({msg:`${count}次了他们才相遇...`})
			}
		}
	})
	//看看jsonp能不能被hold
	app.get('/pollingDealJsonp',(req,res)=>{
		const num = req.query.num
		let count = 0
		while(true){
			count++
			let pattern = Math.floor(Math.random()*600000000)
			if(pattern === Number(num)){
				res.send(`console.info( "I am from back your input is ${num}  ,执行了${count}次数才相遇");linkScriptTag('http://localhost:622/pollingDealJsonp?num=525')`)
			}
		}
		console.log(num)
	})
}
module.exports = router