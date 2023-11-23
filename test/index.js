const testWhois = await Bun.file('./test-whois.txt').text()
const parser = require('../')

/*
const urlToDomain = /(?:\/)?((?!www\.|@)\b\w{1,}\b\..*?)(?:\/|\?|$)/
const [ , match ] = url.match(urlToDomain)
*/
const url = 'https://user@caamillo.it/'

console.log(parser(testWhois, url))