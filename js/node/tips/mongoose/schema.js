const Schema = require('mongoose').Schema
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
	},
	_id:{
		type:ObjectId
	}
})

module.exports = user_schema