/*stdout stdin stderr*/

/**原来stdin如此装逼**/
process.stdin.setEncoding('utf8')
process.stdin.on('readable',()=>{
	const chunk = process.stdin.read()
	if(chunk){
		console.log(`stdin is ${chunk}`)
		process.stdin.end()
	}
})
process.stdin.on('end',()=>{
	process.stdout.write('stdin is come to end')
})
/*简直就是输出*/
process.stdout.write(`I am pure stdout`)
process.stderr.write(`I am pure stderr \n`)