/*js中this的指向详细版本*/

//**默认指向window,this的指向不取决于定义时候,取决于执行时候 5小类

//===取决于执行时候被谁调用
function one(){
	console.log(this)//window
}
//相当于window.one()
one()
var p = {
	two:function(){
		console.log(this)//p
		return u
	}
}
//被p调用
p.two()

//===若是多层的调用,那么,只向外值一层
var q = {
	a:'d',
	b:{
		a:'haha',
		show:function(){
			console.log(this.a)
			cnosole.log(this)
		}
	}
}
//虽说多层,但是最终指向b,上述的p实际也是 等于window.p.two()
q.b.show()//haha,a

//===指向最后调用的对象
var final_q = q.b.show
//这个final_q和q.b.show相等,将相当于把当前this暴露给了window
final_q()//haha,window

//===构造函数版本的,实例化以后,this指向了对象
function c () {
	this.a = 'a'
	this.p = function(){
		console.log(this)
		console.log('show p')
	}
}
var foo = new c()
foo.p()//c:{a:'a',p:function(){}}

//===有return的时候,若是返回的是对象或者函数,可以想成变成那个return的函数了,this自然变啊了
	//但是返回的是其他实在值的时候,还是一样的指向对象
function yo(){
	this.b = 'b'
	// return {}
	return 'j'
}
var youo = new yo()
youo.b//undefined
