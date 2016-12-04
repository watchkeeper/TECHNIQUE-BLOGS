const assert = require('assert')

assert(true)
// assert(0)
// assert('')
assert.ok(true)
// assert.ok(0)

//means==
assert.equal(1,'1')
//can not judge obj
// assert.equal({a:'a'},{a:'a'})

var a1 = {
	a:{
		b:1
	}
}
var a2 = {
	a:{
		b:2
	}
}
var a3 = {
	a:{
		b:'1'
	}
}
var a4=  Object.create(a1)
//==
assert.deepEqual(a1,a3)
// assert.deepEqual(a1,a2)
assert.deepEqual(a1,a1)
//object.create is based on prototype  deep ont equal
// assert.deepEqual(a1,a4)
assert.deepEqual(1,'1')

try{
	assert.deepStrictEqual(1,'1')
	assert.deepStrictEqual(a1,a3)
}catch(err){
	console.log('asserting err')
}
assert.deepStrictEqual(a1,a1)

/*main to deal the callback error if error is existed,then jump ,false pass*/
try{
	assert.ifError(true)
}catch(err){
 	console.log(err)
}
console.log('try catch make it still running...')
assert.ifError(false)
assert.ifError('')