const testWhois = await Bun.file('./test-whois.txt').text()
const parser = require('../')

console.log(parser(testWhois, 'caamillo.it'))