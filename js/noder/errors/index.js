
const p = 30
try{
	if(p<31){
		//this will show detail of line and detail , what i fill in is the title
		throw new Error('The value is not right ! ')
		//this just show whta I've write
		throw 'what fuck have you wrote?'
	}else{
		console.log('The value is available......')
	}
}catch(e){
	console.log(e)
	console.log('value error happen')
	console.log('please re print in .......')
}