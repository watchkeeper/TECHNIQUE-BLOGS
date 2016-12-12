/*弱水三千暂取一瓢*/
const fs = require('fs')
let crypto 

try{
	crypto = require('crypto')
}catch(err){
	console.log('you node version does not support it')
}

const key = "modlefairy"

const message = "I love ZhongYaji"

/*one*/
const hash = crypto.createHmac('sha256',key)
			.update(message)
			.digest('hex')
console.log(hash)

/*two cipher*/
const cipher = crypto.createCipher('aes192',key)
/*加密后的码*/
let cipher_code
/*解密后的码*/
let decipher_code
/*stream*/
/*this is async*/
// let encrypt = ''
// cipher.on('readable',()=>{
// 	let data = cipher.read()
// 	if(data){
// 		encrypt += data.toString('hex')
// 	}
// })
// cipher.on('end',()=>{
// 	console.log(encrypt)
// 	cipher_code = encrypt
// })
// cipher.write(message)
// cipher.end()

/*sync*/
let encrypted = cipher.update(message,'utf8','hex')
encrypted += cipher.final('hex')
console.log(`编码后的 : ${encrypted}`)
cipher_code = encrypted


/*like these  编码有问题*/
// const read = fs.createReadStream('cipher.txt')
// const write = fs.createWriteStream('cipher_code.txt')
// read.pipe(cipher).pipe(write)


/*three decipher method is same as cipher*/
const decipher = crypto.createDecipher('aes192',key)
let decrypt = decipher.update(cipher_code,'hex','utf8')
decrypt += decipher.final('utf8')
console.log(`再次解码后的是:${decrypt}`)

/*sha1 不可逆加密*/
const sha_1 = crypto.createHash('sha1')
const sha_1_code = sha_1.update('I love my fairy','utf8').digest('hex')
console.log(sha_1_code)


