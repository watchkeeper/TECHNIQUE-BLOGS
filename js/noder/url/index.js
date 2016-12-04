const url = require('url')

const obj = url.parse('http://nodejs.cn/doc/node/url.html?page=10')
console.log(obj)

const path = url.format(obj)
console.log(path)