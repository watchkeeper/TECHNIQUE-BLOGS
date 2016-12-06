/*promise self define to deal with async*/
/*promise的源码的大概的思路*/
var m_promise = (function(){
	var promise = function(){
		this.nexts = []
	}
	promise.prototype={
		/*two peer success and fail function*/
		/*每个resolve和reject是一对*/
		next:function(cb_resolve,cb_reject){
			this.nexts.push({
				ok:cb_resolve,
				ko:cb_reject
			})
			return this
		},
		ok:function(v){
			var count=0
			var returner = ''
			/*only exist value will exec as well shift*/
			while(this.nexts[0]){
				count++
				/*first next and get param from resolve*/
				if(count<=1){
					returner = this.nexts.shift()['ok'](v)
				}else{
					//below step return a value
					if(returner){
						returner = this.nexts.shift()['ok'](returner)
					}else{
					//not return value
						returner = this.nexts.shift()['ok']()
					}
				}
			}
		},
		ko:function(v){
			var count = 0
			var returner = ''
			if(this.nexts[0]){
				count++
				/*first next and get param from resolve*/
				if(count<=1){
					returner = this.nexts.shift()['ko'](v)
				}else{
					//below step return a value
					if(returner){
						returner = this.nexts.shift()['ko'](returner)
					}else{
					//not return value
						returner = this.nexts.shift()['ko']()
					}
				}
			}
		}

	}
	return promise
}())


function ko(){
	var promise = new m_promise()
	setTimeout(function(){
		promise.ko('first is KO \n')
	},200)
	return promise
}
ko()
.next(function(){},function(msg){
	console.log(msg)
})


function test(){
	var promise = new m_promise()
	setTimeout(function(){
		promise.ok('first is ok')
	},1000)
	return promise
}

test()
.next(function(msg){
	console.log(msg)
	return 'second is ok'
})
.next(function(msg){
	console.log(msg)
})
.next(function(){
	console.log('all is finished')
	test()
	.next(function(data){
		console.log('again '+data)
	})
})