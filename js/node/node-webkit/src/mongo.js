const mc = require('mongodb').MongoClient
const assert = require('assert')
const crypto = require('crypto')
const http = require('http')

const config  =  {}
config.ip = '120.25.74.190'
config.port = 27017
config.db = 'note'

const url = `mongodb://${config.ip}:${config.port}/${config.db}`

const sha = (str)=>{
	const doing = crypto.createHash('sha1')
	doing.update(str)
	const final = doing.digest('hex')
	return final
}

/*
@userMsgObj format ==>  {username:"modle",password:"sherlock",time:Date.now()}
*/
const register = (userMsgObj)=>{
	const promise = new Promise((resolve,reject)=>{
		mc.connect(url,(err,db)=>{
			assert.equal(null,err)
			console.log("connect successful!")
			const col = db.collection('user')
			col.insert([
				{
					username:userMsgObj.username,
					password:sha(userMsgObj.password),
					time:userMsgObj.time
				}
			],{w:1},(err,result)=>{
				assert.equal(null,err)
				console.log(result)
				resolve(result)
				db.close()
			})
		})
	})
	return promise
}

/*
@params:
	col:collection
	query:{}
}
*/
const find = (collection,query={})=>{
	const promise = new Promise((resolve,reject)=>{
		mc.connect(url,(err,db)=>{
			assert.equal(null,err)
			const col = db.collection(collection)
			if( !Object.keys(query).length ){
				col.find().toArray((err,docs)=>{
					assert.equal(null,err)
					console.log(docs)
					resolve(docs)
					db.close()
				})
			}else{
				col.findOne(query,(err,docs)=>{
					assert.equal(null,err)
					console.log(docs)
					resolve(docs)
					db.close()
				})
			}
		})
	})
	return promise
}

/*
 	arr:[{}]
*/
const insert = (collection,arr)=>{
	const promise = new Promise((resolve,reject)=>{
		mc.connect(url,(err,db)=>{
			assert.equal(null,err)
			const col = db.collection(collection)
			col.insertMany(arr,(err,result)=>{
				assert.ok(!err)
				console.log('insert data successfully!!!')
				console.log(result.ops[0])
				resolve(result.ops[0])
				db.close()
			})
		})
	})
	return promise
}
// insert('plan',[{state:"hahahah,我是sherlock",status:1,time:'0000009'}])

const remove = (collection,obj)=>{
	const promise = new Promise((resolve,reject)=>{
		mc.connect(url,(err,db)=>{
			assert.equal(null,err)
			const col = db.collection(collection)
			col.removeOne(obj,(err,result)=>{
				assert.ok(!err)
				console.log('delete data successfully!!!')
				console.log(result)
				resolve(result)
				db.close()
			})
		})
	})
	return promise
}

const update = (collection,objFilter,newObj)=>{
	const promise = new Promise((resolve,reject)=>{
		mc.connect(url,(err,db)=>{
			assert.equal(null,err)
			const col = db.collection(collection)
			col.updateOne(objFilter,{$set:newObj},(err,result)=>{
				assert.ok(!err)
				console.log(result)
				console.log('update successfully')
				resolve(result)
				db.close()
			})
		})
	})
	return promise
}

// update('plan',{time:'0000009'},{state:'fufufufufucckckkck'})


module.exports = {
	register:register,
	find:find,
	insert:insert,
	remove:remove,
	update:update,
	sha:sha
}



