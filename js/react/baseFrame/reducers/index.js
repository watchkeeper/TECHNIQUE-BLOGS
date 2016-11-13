/*reducer*/

export default (state,action)=>{
	state= {
		content:"曾听说过,曾寻觅爱情,而我和你,平静旅程,既没有惊心又动魄的情景",
		placeholder:'填入你想对爱人说的话'
	}
	switch(action.type){
		case "POST_MSG":
			state.content=action.payload
			console.info(state)
			return state
		default:
			return state	
	}
}