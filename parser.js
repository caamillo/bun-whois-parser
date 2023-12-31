const { findDomain, wrapDomain, domainToTld } = require('./utils')

// Deps
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const DATE_KEYS = [
	'updatedDate',
	'creationDate',
	'expirationDate'
]

const compareAllNotFound = (patterns, data) => {
	const allNotFounds = patterns.map(pattern => pattern?.etc?.notFound)
		.filter(notFound => notFound)
	const matchNotFounds = allNotFounds.map(notFound => data.match(notFound))
		.filter(match => match).flat()
	
	return matchNotFounds.length
}

const sanify = (parsed, etc) => {
	Object.keys(parsed).map(key => {
		let value = parsed[key]
		if (typeof value === 'string') {
			value = value.trim()
			value = value.length ? value : undefined
		}
		parsed[key] = value
	})
	return parsed
}

const parse = (data, { _, regex, etc }, tld, toISO) => {
	const parsed = {}
	parsed.tld = tld

	if (data.match(etc.notFound)) parsed.available = true
	else parsed.available = false

	Object.keys(regex).map(key => {
		const match = data.match(regex[key])?.slice(-1)?.join()
		parsed[key] = match
	})

	for (let dateKey of DATE_KEYS) {
		const stringDate = parsed[dateKey]

		if (stringDate) parsed[dateKey] = etc.dateFormat ? dayjs(stringDate, etc.dateFormat).format() : dayjs(stringDate).format()
		else continue

		if (parsed[dateKey] === 'Invalid Date') parsed[dateKey] = stringDate
		else parsed[dateKey] = toISO ? new Date(parsed[dateKey]).toISOString() : parsed[dateKey]
	}
	
	return sanify(parsed)
}


module.exports = (data=undefined, url=undefined, toISO=true, optimize=false) => {
	const patterns = require('./patterns')(optimize)

	const domain = url ? wrapDomain(url) : findDomain(data, patterns)
	if (!domain && !domain?.value) return compareAllNotFound(patterns, data) ? { available: true } : undefined

	const tld = typeof domain === 'string' ? domainToTld(domain) : domain?.value ? 
		domain?.isDomain ? domainToTld(domain.value) : domain.value : undefined
	
	if (!tld) return undefined
	
	let pattern = patterns.find(el => el.tld === tld)
	pattern = pattern ? {
		tld: pattern.tld,
		regex: {
			...patterns[0].regex,
			...pattern.regex
		},
		etc: {
			...patterns[0].etc,
			...pattern.etc
		}
	} : patterns[0]

	return parse(data, pattern, tld, toISO)
}