/*deal state in some conditions,就是再把state处理一遍,没什么神奇的,store是最原始的*/
export default{
	add_username(state){
		return `欢迎您,亲爱的用户哇!---${state.head_title}`
	}
}
