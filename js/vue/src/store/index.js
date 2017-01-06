import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './state'
import list from './modules/list'

Vue.use(Vuex)

//开始我犯了个2逼的错误,const,let不能hoist
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules:{
		list:list
	}
})