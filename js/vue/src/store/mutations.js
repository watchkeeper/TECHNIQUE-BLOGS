import * as types from './mutation-types'
/*mutation is sync chagne state and;emit by store.commit(mutationObjName)*/
export default{
	//vuex里面直接不用像react一样用return,会自动改变的
	[types.HEAD_TITLE](state,payload){
		console.info('mutation emitted')
		state.head_title = payload.head_title
	},
	[types.FOOT_TITLＥ](state,payload){
		state.foot_title = payload.foot_title||"Do  not change the footer plaese..."
	}
}
