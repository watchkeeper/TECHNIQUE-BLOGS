/*
*今我来思,感觉这样不好,看到人家的是思路还不错
*schema和model就在一个文件里面,对应的就是一个collection的方法和数据,只需要对外
*暴露model名字,直接使用model或者entity就行了哇,这样子还比较方便的哇
*/
const mongoose = require('mongoose')
const lover_model = require('./model').lover_model

const url = "mongodb://localhost/plot"

mongoose.connect(url)

const db = mongoose.connection
db.on('error',(e)=>{
	console.log('error happen at document index.js 10 line when connect!')
	console.log(e)
})
db.once('open',(e)=>{
	console.log(`mongo link successfully!`)

	//创建
	const entity = new lover_model({
		man:'sherlock_modle',
		woman:"fairy_princess",
		home:"the beatiful city",
		year:100
	})
	console.log(entity)
	entity.save()
	//查询
	lover_model.findByName('sherlock_modle')
	.then((result)=>{
		console.log(result)
		db.close()
	})
})


