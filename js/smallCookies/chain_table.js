console.log('链表js实现')
function node(element){
	this.next = null
	this.element = element
}

var chain = {
	list:new node('header'),
	find:find,
	remove:remove,
	add:add
	// update:update
}
chain.list.next = {
	element:'one',
	next:{
		element:'two',
		next:{
			element:null,
			next:null
		}
	}
}
//*****************主要的思路就是如何遍历多层的对象,如:
// {
// 	element:'',
// 	next:{
// 		element:'',
// 		next:{
// 			element:'',
// 			next:{}
// 		}
// 	}
// }
// 然后进行对象的键和值的修改就好了

//update 传入要修改的元素和新的元素
function update(item,newer){
	var cur = chain.list
	while(cur.element!=item){
		cur = cur.next
	}
	cur.element = newer
}
// update('one','fuck')
// update('two','mapi')

//移除链表当中一个节点,需要知道移除哪个
function remove(item){
	var cur = chain.list
	while(cur.next.element!=item){
		cur = cur.next
	}
	cur.next = cur.next.next
}
// remove('one')


//查找某个元素,
	//注意这里的遍历的方法,为啥子是while而不是for,同级才能够是for,有父子级别之分,while
function find(item){
	var cur_item = chain.list
	while(cur_item.element != item){
		cur_item = cur_item.next
	}
	return cur_item
}
// console.log(chain.find('two'))

//添加元素 需要前驱和element
function add(before,item){
	var ele = new node(item)
	var e={
		next:ele.next,
		element:ele.element
	}
	var cur = chain.list
	while(cur.element!=before){
		cur = chain.list.next
	}
	e.next = cur.next
	cur.next =e
	return e
}
// console.log(chain.add('one','I am insert!'))

console.log('Last result is*************** ')
console.log(chain.list)

