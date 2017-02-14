const two = require('./two')
const chai = require('chai')
const expect = chai.expect

describe('test文件夹下two的测试',function(){
	it('减法的测试',function(){
		expect(two(10,7)).to.be.equal(3)
	})
	it('减法2的测试',function(){
		expect(two(10,6)).to.be.equal(4)
	})
})