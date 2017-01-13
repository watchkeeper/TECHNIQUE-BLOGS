//mongodb遵循的家就是不希望像是mysql一样在建立表初始
//遵循就是schema里面,即写即用

//就有点像是codeIgniter的框架
/*
*	容我重新解释一遍
*	schema:我觉得就是mysql里面的创建表的那个步骤,无需手动,这里,就成了个schema
*	model,就像是ci框架里面的$this->db->database()库提供的对数据库操作的原始的方法,仅仅是insert update没经过组装的
*	entity,这里就是ci的model里面的组装好的,针对每个表[collections]的方法,有相应的名字,这么想就完全ok了,比如什么findById or UpdateByUsername......
*/
const plan = require('./model/planner')

const plans = new plan({
})
console.log(plans)

plans.findByName({
	condition:{name:'king'}
}).then((res)=>{
	console.log('this is entity find')
	console.log(res)

	plan.updateMsg({
		condition:{last_time:100000},
		set:{$set:{name:"dear_fairy"}}
	}).then((res)=>{
		console.log('this si res in model in index at line 7 ')
		console.log(res)
	})

})