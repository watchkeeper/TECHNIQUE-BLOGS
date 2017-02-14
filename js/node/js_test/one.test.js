//one.test命名必须遵循的规则name.test
const one = require('./one')
//chai是一个断言库
const chai = require('chai')
const expect = chai.expect

describe('one假发函数测试',function(){
	it('2+2的测试',function(){
		expect(one(2,2)).to.be.equal(4)
	})
	it('2+4的测试',function(){
		expect(one(2,4)).to.be.equal(6)
	})
})