const testWhois = await Bun.file('./test-whois.txt').text()
const parser = require('../')

console.log(parser(testWhois))
const urlToDomain = /(?:\/)?((?!www\.|@)\b\w{1,}\b\..*?)(?:\/|\?|$)/ig
const url = 'caamillo.it'


const match = url.match(urlToDomain)[0]
console.log(match.replaceAll('/', ''))