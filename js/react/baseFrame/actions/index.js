/*actions*/

export const POST_MSG = (payload)=>{
	return   (dispatch)=>{
			console.log('async redux thunk dealing......')
			console.warn('any async operations will be done here...')
			dispatch(
				{
					type:"POST_MSG",
					payload
				}
			)
		}
}