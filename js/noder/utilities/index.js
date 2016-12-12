const util = require('util')

process.env.PORT = 3000
process.env.debug = true

console.log(process.env)

console.log(process.env.PORT,process.env.debug)

const a = {
	a:'a',
	b:'b',
	c:'c'
}
const b= {
	modle:{
		name:'sherlock'
	},
	fairy:{
		name:'zhongyaji'
	}
}
const c = Object.assign(a,b)
console.log(c)

/*node work*/
// const debuglog = util.debuglog('foo')
// debuglog('hello  from foo [%d]',123)

const format = util.format('%s:%s--%d...%j','hello','honey','fuck',{"hello":"world"}) 
console.log(format)

/*with time*/
util.log('this')

const you = {hello:'haha',me:{name:{one:'sherlock'}}}
you.__proto__.she = 'fairy'
console.log(util.inspect(you,{showHidden:true,depth:null,colors:true}))

const she = ['a','b']
console.log(util.isArray(she))

try{
	const err= new Error('fuck')
	throw err
}catch(err){
	// console.log(err)
	console.log(util.isError(err))
	console.log('self define error happend')
}
console.log('it is continue')