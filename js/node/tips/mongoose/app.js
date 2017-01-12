const mongoose = require('mongoose')
const url = `mongodb://localhost/plot`

mongoose.connect(url)

const db = mongoose.connection
db.on('error',()=>{
	console.log('mongoose connect error!')
})
db.once('open',()=>{
	console.log('mongoose open ! ')
})

//schema
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const user_schema = new Schema({
	name:{
		type:String,
		default:'modle'
	},
	age:{
		type:Number,
		min:18,
		index:true
	},
	date:{
		type:Date,
		default:Date.now
	}
})
/*实例方法,仅仅entity可以使用*/
user_schema.methods.showMsg = (msg)=>{
	console.log('I am function in user_schema and can use by all model and entity '+msg)
}
/*静态方法,model使用[model]*/
user_schema.statics.warnMsg = (msg)=>{
	console.log('I am static method and called by ' + msg)
}

//model
/*有点匪夷所思在User这里==>实际上是建给users collection建立schema*/
 const user_model = mongoose.model('User',user_schema)
 user_model.warnMsg(' called by model')

 //entity operation
 const entity = new user_model({
 	name:"modle_sherlock_hello",
 	age:24
})

 entity.showMsg('I am caller by entity')

 entity.save((err)=>{
 	if(err){
 		console.log('save failed')
 	}else{
 		console.log('save successfully!')
 		user_model.update({age:22},{$set:{name:"fuck cedong"}},(err)=>{
 			console.log('已经更新')
 		})
 	}
 })






