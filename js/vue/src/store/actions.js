import * as actions from './action-types'
import * as types from './mutation-types'
/*this is 'action' from view and deal async method , store.dispatch(name) to emit*/
export default{
	/*show_head_title(context,payload),content析构成{}方便引用*/
	[actions.show_head_title]({commit,state},payload){
		//to emit mutations
		console.info('actions emitted')
		commit(types.HEAD_TITLE,payload)
	},
	[actions.show_foot_title]({commit},payload){
		commit(types.FOOT_TITLＥ,payload)
	}
}