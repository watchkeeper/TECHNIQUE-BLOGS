/*hybrid*/
const fs = require('fs')
const db = require('./src/mongo.js')
const util = require('util')
const user_record = './user.json'

class Index{
	constructor(){
		let [router,initial] = []
		
		// db.find('plan',{}).then((msg)=>{
		// 	this.initial = msg
		// 	alert(util.inspect(this.initial))
		// })
		//fuck if i put beginRouter in checkJsonDoc callback would loop jump window fucking!
		this.beginRouter()
		this.checkJsonDoc(user_record).then((flag)=>{})
	}
	static  loginTpl(){
		return {
			template:"#login-tpl",
			data:()=>({
				userMsg:{
					user:'',
					pswd:''
				}
			}),
			methods:{
				login(){
					// alert('fuck')
					const inputerUser = this.userMsg.user
					const inputerPswd = this.userMsg.pswd
					if( inputerUser.length<5 || inputerPswd.length<5 ){
						alert("username or password must more than 4 bytes")
					}else{
						/*remore save judge*/
						db.find('user',{username:inputerUser})
						.then((msg)=>{
							// alert(util.inspect(msg))
							if(!msg){
								alert('Your username is not right!')
							}else{
								if(db.sha(inputerPswd)!=msg.password){
									alert('Your password is not right!')
								}else{
									alert('Log in successfully!!!')
									// alert(window.location.href)
									const root_url = window.location.href.split('#/').shift()
									// alert(util.inspect(root_url))
									window.location.href=root_url+'#/'
								}
							}
						})
						/*local json document save judge*/
						// const data = fs.readFileSync(user_record)
						// const obj = JSON.parse(data)
						// const username = obj.user
						// const password= obj.pswd
						// if(username== inputerUser && password==inputerPswd){
						// 	alert('log in successfully!')
						// }else{
						// 	alert('username or password is error!!')
						// }
					}
				}
			}
		}
	}
	static registerTpl(){
		return {
			template:"#register-tpl",
			data:()=>({
				userMsg:{
					user:'',
					pswd:'',
					Rpswd:''
				}
			}),
			methods:{
				register(){
					let user = this.userMsg
					if(this.len(user.user)<6 || this.len(user.pswd)<6){
						alert("username or password must more than 5 bytes")
					}else if(user.pswd !== user.Rpswd){
						alert("the password you inputed is not equal!")
					}else{
						/*remote save judge*/
						db.find('user',{username:user.user})
						.then((msg)=>{
							if(msg){
								alert('already exist ! change your username!')
							}else{
								db.register({
									username:user.user,
									password:user.pswd,
									time:Date.now()
								}).then((msg)=>{
									alert('register successfully')
									window.location.reload()
								})
							}
						})
						/*local document judge
						//limit user exist can not reigister
						const user = fs.readFileSync(user_record)
						if(user.length>0){
							alert('Already exist! Can not register any more')
							//close window
							process.exit(0)
						}
						// console.warn(user)
						//parent do not need data from here ,just deal by self
						// this.$emit('do-register',user)
						const user_str = JSON.stringify(user)+`\r`
						// alert(user_str)
						fs.appendFile(user_record,user_str,(err)=>{
							if(err){
								alert('local register fail ! ')
								process.exit(1)
							}
							alert('register successfully!!!')
							window.location.reload()
						})
						*/
					}
				},
				len(str){
					return str.length
				}
			}
		}
	}
	static getTime(){
		const cur = new Date()
		const year = cur.getFullYear()
		const month = cur.getMonth()+1
		const day = cur.getDate()
		const hour = cur.getHours()
		const minute = cur.getMinutes()
		const second = cur.getSeconds()
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`
	}
	static mainTpl(){
		return {
			template:"#main-tpl",
			data:()=>({
				newPlan:'',
				planList:[]
			}),
			computed:{
				// planList(){
				// 	alert()
				// 	alert(this.initial)
				// 	return this.initial
				// }
			},
			methods:{
				addPlan(){
					/* insert data*/
					const newRecord = {
						state:this.newPlan,
						time:Index.getTime(),
						status:1
					}
					// alert(util.inspect(newRecord))
					db.insert('plan',[newRecord]).then((msg)=>{
						//reDraw data from db
						// alert(util.inspect(msg))
						this.planList.push(msg)
					})
				},
				finish(id){
					const index = this.planList.findIndex((v,n)=>(
						v._id==id
					))
					// alert(index)
					db.update('plan',{_id:id},{status:0})
					.then((msg)=>{
						const temp = this.planList[index]
						const newObj = {
							_id:temp._id,
							state:temp.state,
							time:temp.time,
							status:temp.status==1?0:0
						}
						this.planList.splice(index,1,newObj)
						// alert(`update ${msg.result.n} data`)
					})

				},
				ridofit(id){
					const index = this.planList.findIndex((v,n)=>(
						v._id==id
					))
					db.remove('plan',{_id:id}).then((msg)=>{
						// alert('Delete successfully')
						this.planList.splice(index,1)
					})
				}
			}
		}
	}
	checkJsonDoc(loginDoc){
		let promise = new Promise((resolve,reject)=>{
			fs.exists(loginDoc,(flag)=>{
				if(flag){
					resolve(true)
				}else{
					fs.writeFile(loginDoc,'',(err)=>{
						if(err){
							alert('error happend when create!')
							reject(false)
							process.exit(1)
						}
						resolve(true)
					})
				}
			})
		})
		return promise
	}
	createFilter(){
		Vue.filter('inputer',{
			/* write in model*/
			write(newer,older){

			},
			/*read to view*/
			read(value,param){

			}
		})
	}
	beginRouter(){
		const routes = [
			{path:'/login',component:Index.loginTpl(),name:'user'},
			{path:'/register',component:Index.registerTpl(),name:'register'},
			{path:'/',component:Index.mainTpl(),name:'main'}

		]
		this.router = new VueRouter({
			routes:routes
		})
		this.app()
	}
	app(){
		const modle = new Vue({
			el:"#app",
			router:this.router,
			data:{

			},
			methods:{
				saveUser:(msg)=>{
					let str_msg = JSON.stringify(msg)
					//......more actions  because no need son data,so ,Do not reach here
				}
			}
		})
		// this.router.push('/')
		this.router.push('/login')
	}
}

const run = new Index()


