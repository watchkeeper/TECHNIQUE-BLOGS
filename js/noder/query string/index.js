const querystring = require('querystring')

const query = 'you=fairy&me=modle&me=sherlock&me=love'
const result = querystring.parse(query)
console.log(result)

const obj = { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
const str = querystring.stringify(obj)
const str_1 = querystring.stringify(obj,';',':')
console.log(str)
console.log(str_1)

const tmp = {
	hello:'world',
	she:'fairy'
}
const you = querystring.stringify(tmp)
console.log(you)
