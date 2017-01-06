import * as types from '../mutation-types'
import * as action_types from '../action-types'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default{
	state:{
		list:null
	},
	mutations:{
		[types.LIST_FILL](state,payload){
			state.list = payload.list||[]
		}
	},
	getters:{

	},
	//很多action是异步的,有执行的顺序,所以防止异步
	actions:{
		[action_types.get_list]({commit,state,dispatch},payload){
			return new Promise((resolve,reject)=>{
				const params = payload||{}
				//组件内引用是this.$http
				//全局应用是Vue.http
				Vue.http({
					url:'http://localhost:7777/api/list.json',
					body:{},
					params:{},
					emulateJSON:true,
					credientials:false,
					timeout:1000*60,
					method:'get'
				}).then((res)=>{
					console.info(res.data.list)
					commit(types.LIST_FILL,{
						list:res.data.list
					})
					resolve()
				},(err)=>{
					console.error(err)
					reject()
				})
			})
		}
		/*可以异步在action内,执行完某个action在执行另外一个*/
		// [action_types.return_list]({commit,state,dispatch},payload){
		// 	return dispatch(action_types.get_list)
		// 		.then(()=>{
		// 			commit("some other mutations")
		// 		})
		// }
	}
}