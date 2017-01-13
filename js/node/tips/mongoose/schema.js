const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

//define schema
const lover = new Schema({
	man:{
		type:String,
		default:"modle_sherlock"
	},
	woman:{
		type:String,
		default:"fairy_baby"
	},
	home:{
		type:String,
		default:"all of yunnan"
	},
	year:{
		type:Number,
		default:44
	}
})
exports.lover_schema = lover

//define model method
lover.statics.findByName = function(name){
	return new Promise((resolve,reject)=>{
		this.find({$or:[{man:name,woman:name}]},(err,result)=>{
			if(err){
				console.log('err happened!')
				console.log(err)
				process.exit(1)
			}
			console.log('check ok')
			resolve(result)
		})
	})
}
exports.findByName = lover.statics.findByName