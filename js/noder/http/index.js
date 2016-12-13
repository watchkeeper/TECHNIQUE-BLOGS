/*和http大同小异*/
const https = require('https')
const http = require('http')
const url = require('url')
var querystring = require('querystring')
let type
try{
	type = process.argv[2]
}catch(e){
	console.log('请输入参数并且是一个!')
}

/*发出get和post请求,发出发出*/
// const link = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx95e40358dfa43601&secret=ff634fb968a4ed91f3eb0811dd892948"
  
/*GET METHOD  successfully!*/
if(type=='get'){
	const link = 'http://127.0.0.1:8888/fuck.php?sherlock=fucking_boring_life_i_am_living'

	const obj = url.parse(link)
	var options = {  
		hostname: obj.hostname,  
		port: obj.port,  
		path:obj.path,
		method:'get'
	}
	  
	var req_get = http.request(options, function (res) {
		res.on('data', function (chunk) {  
			console.log(chunk.toString('utf8'))
		})
	})
	req_get.on('error',(e)=>{
		console.log(e)
	})
	req_get.end()
}

/*POST METHOD !*/
/*老子这里从头就是错的 沃日妈批 沃日! 这里成功了,和ajax异曲同工啊*/
if(type=='post'){
	const link_ = 'http://127.0.0.1:8888/fuck.php?sherlock=fucking_boring_life_i_am_living'
	const data = {
		modle:"There is you there is me",
		wise:'Forever behind you'
	}
	const parser_url = url.parse(link_)
	const post_option = {
		hostname:parser_url.hostname,
		port:parser_url.port,
		path:parser_url.path,
		method:'post',
		headers:{
			"Content-Type":"application/x-www-form-urlencoded"
		}

	}
	const post_data = querystring.stringify(data)
	console.log(post_data)
	const req_post = http.request(post_option,(res)=>{
		res.on('data',(chunk)=>{
			console.log('this is chunk')
			console.log(chunk.toString('utf8'))
		})
	})
	req_post.on('error',(e)=>{
		console.log('http post error '+e)
	})
	req_post.write(post_data)
	req_post.end()

}