const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

mongoose.connect("mongodb://localhost/plot")

const db = mongoose.connection
db.on('error',()=>{
	console.log(`db error happen when connectied!`)
})
db.once('open',()=>{
	console.log(`db has been openned`)

})
//define schema====>means to create mysql table 
const planner_schema = new Schema({
	name:{
		type:String,
		default:"make your plan"
	},
	time:{
		type:Date,
		default:Date.now()
	},
	planner:{
		type:String,
		default:"modle_sherlock"
	},
	last_time:{
		type:Number,
		default:12
	}
})

/*?may I define all of the to entiry methods? I guess of course I can and It will be more clear than call model as well as entity?*/

//define statics methods and used by model===> this should not be use for much
planner_schema.statics.updateMsg = function(obj){
	return new Promise((resolve,reject)=>{
		console.log('You are running statics methods and called by model')
		this.update(obj.condition,obj.set,(err,result)=>{
			if(err){
				console.log('error happen when update document at line 40 in planner.js')
				reject(err)
				return
			}
			console.log(result)
			resolve(result)
		})
	})
}
//define entity methods and used by entiry ======>this declare the output method ,show be use more
planner_schema.methods.findByName = function(obj){
	return new Promise((resolve,reject)=>{
		console.log('You are running entity methods and called by entity')
		//这里的model('name')是表名
		this.model('planner').find(obj.condition,(err,result)=>{
			if(err){
				console.log('error happen when find document at line 55 in planner.js')
				reject(err)
				return
			}
			console.log(result)
			resolve(result)
		})
	})
}

//define model
const plan = mongoose.model('planner',planner_schema)

module.exports = plan