/*This is just like map*/

const router = (app)=>{
	app.get('/',(req,res)=>{
		res.send({hello:'world'})
	})
	app.get('/crossDomaind',(req,res)=>{
		const msg = {hello:'world',name:'modle_sherlock',love:"zhongyaji"}
		const msg_string = JSON.stringify(msg)
		res.send(`jsonp_callback(${msg_string})`)
	})
	app.get('/postMsg',(req,res)=>{
		res.send({name:'modle',wife:'fairy'})
	})
}
module.exports = router