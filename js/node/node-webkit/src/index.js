/*hybrid*/
const fs = require('fs')
const user_record = './user.json'

class Index{
	constructor(){
		let [router] = []
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
					const data = fs.readFileSync(user_record)
					alert(data)
					const obj = JSON.parse(data)
					const username = obj.user
					const password= obj.pswd
					alert(username)
					alert(password)
					alert(this.userMsg.user)
					alert(this.userMsg.pswd)
					if(username==this.userMsg.user && password==this.userMsg.pswd){
						alert('log in successfully!')
					}else{
						alert('username or password is error!!')
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
					console.warn(user)
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
			{path:'/register',component:Index.registerTpl(),name:'register'}

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
		this.router.push('/login')
	}
}

const run = new Index()


