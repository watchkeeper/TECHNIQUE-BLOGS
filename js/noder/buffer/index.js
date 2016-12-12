/*自带的数据类型,不用引入*/
const util = require('util')

const buf1 = Buffer.from('love你')
/*输出 <Buffer 6c 6f 76 75 e4 bd a0>*/
/*analysis:没两个是用16进制来表示2进制的八位(一个字节)的6c=>6[0110]  c 12[1100] 也就是  01101100就是代表l,而汉子现在搞成3个字节去了*/
console.log(buf1)
console.log('buf1 to string hex '+buf1.toString('hex'))
console.log('buf1 to base64 '+buf1.toString('base64'))
console.log('buf1 to utf8 '+buf1.toString('utf8'))

/**buffer 基础的申明等等**/
const buf2 = Buffer.from('deep think亲')
console.log(buf2.length)
const buf3 = Buffer.from(buf2)
console.log('buf3 is '+buf3)
const buf4 = Buffer.from([1111,0000,0001,1010,0010])
console.log('arr from array 的 只能够是八个位的数字')
console.log(buf4)
/*申明长度 被填充并且*/
const buf5 = Buffer.alloc(100,'love')
console.log("buf5 "+buf5.length)
console.log(buf5)
//申明字符类型的填入
const buf6=Buffer.alloc(16,'aGVsbG8gd29ybGQ','base64')
console.log(buf6.toString('utf8'))

/*buffer 操作*/
const byteLength = Buffer.byteLength('iloveyou宝')
const byteLength_ = Buffer.byteLength('aGVsbG8gd29ybGQ','base64')
util.log(byteLength)
util.log(byteLength_)

const comp_1 = Buffer.from('123')
const comp_2 = Buffer.from('d123')
const total = Buffer.concat([comp_1,comp_2])
console.log(total)

console.log('is buffer '+ Buffer.isBuffer('fuck'))

const one = Buffer.from('123')
const two = Buffer.from('234')
const three = Buffer.from('1234')

console.log(one.compare(one))
console.log(one.compare(two))
console.log(two.compare(one))
console.log(one.compare(three))
console.log(two.compare(three))
console.log(three.compare(one))
console.log(three.compare(two))

const wow = Buffer.from('thisisyouandthisisme')
const mom = Buffer.alloc(10,'?')
console.log(wow)
console.log(wow.length,Buffer.byteLength(wow))
console.log(mom)
//从wow中拷贝到mom中,从mom4开始接受,接受的是wow的6到9
wow.copy(mom,4,6,9)
console.log(mom.toString())
console.log(wow.includes('this'))
console.log(wow.indexOf('this'))
console.log(wow.lastIndexOf('this'))

for(let i of wow.entries()){
	console.log(i)
}

//比较两个相等吗
const buf__1 = Buffer.from('41424344','hex')
const buf__2 = Buffer.from('ABCD')
console.log(buf__1.equals(buf__2))
console.log(buf__1==buf__2)






