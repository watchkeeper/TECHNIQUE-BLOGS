/*BASIC RESEARCH CAN NOT USE DIRECTELY
*schema:就是基础的结构和类型,属性和方法,是个结构框架
*model:结合collection和data产生的一套方法论
*entity:就是单纯的数据的结构,也就是document
*/
/*this is first test document*/
const mongoose = require('mongoose')

//initial link---------------------------
const url = `mongodb://localhost/plot`
mongoose.connect(url)
const db = mongoose.connection
db.on('error',()=>{
	console.log('mongoose connect error!')
})
db.once('open',()=>{
	console.log('mongoose open ! ')
})


//SCHEMA----------------------------------(1)可以添加方法,属性,静态方法=>model=>this()使用,实例方法=>entiry,this.model()使用,方法写法有诈
const Schema = mongoose.Schema
	/*我这里的ObjectId无法使用哇*/
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
	/*继续添加属性*/
user_schema.add({saying:{type:String,default:'saying fucking'}})
	/*实例方法,仅仅entity可以使用*/
user_schema.methods.showMsg = (msg)=>{
	console.log(this)
	console.log('I am function in user_schema and can use by all model and entity '+msg)
}
	/*这个地方调用到this,但是,用()=>{}有问题,this指向不正确,用function(){},this指向才正确*/
user_schema.methods.findSimilarTypes = function(cb) {
	console.log(this)
	return this.model('User').find({}, cb);
}
	/*静态方法,model使用[model]*/
user_schema.statics.warnMsg = function(msg){
	console.log('I am static method and called by ' + msg)
}
user_schema.statics.findAllHa = function(cb){
	return this.find({},cb)
}


//MODEL------------------------,建立collecton,可以丢整个collection进行操作
	/*有点匪夷所思在User这里==>实际上是建给users collection建立schema*/
 const user_model = mongoose.model('User',user_schema)
 user_model.warnMsg(' called by model')
 user_model.findAllHa((err,person)=>{
 	console.log('I am statics method define by schema and use by model')
 	console.log(person)
 })
 user_model.find((err,person)=>{
 	console.log('here is model check result')
 	console.log(person)
 })
 	//this is a function
// console.log(user_model)


 //ENTITY---------------------------建立一天document实例,借助schema的实例方法可以操作之
 const entity = new user_model({
 	name:"modle_sherlock_hello",
 	age:24
})
 	//this is a object
 console.log(entity)
 entity.showMsg('I am caller by entity')
 entity.findSimilarTypes((e,r)=>{
 	console.log('entity methods to execute')
 	console.log(e,r)
 })
 entity.save((err)=>{
 	if(err){
 		console.log('save failed')
 	}else{
 		console.log('save successfully!')
 		user_model.update({age:22},{$set:{name:"fuck cedong"}},(err,result)=>{
 			console.log(result)
 			console.log('已经更新')
 		})
 	}
 })






