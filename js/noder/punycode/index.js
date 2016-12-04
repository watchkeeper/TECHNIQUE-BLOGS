const punycode = require('punycode')
/*这是什么鬼,专门处理unicode 和 ascii的*/
const modle_sherlock = punycode.decode('modle_sherlock')

console.log(modle_sherlock)

const out = punycode.encode('modle_sherlock')
console.log(out)

