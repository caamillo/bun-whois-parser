const tlds = require('./tlds.json')

const sanify = (thing) =>
    thing.trim().toLowerCase()

const domainToTld = (domain) =>
    sanify(domain).split('.').slice(-1).join() // That seems wrong, because .co.br would be wrapped into .br; but trust me it works

const doesTldExists = (tld) =>
    tlds.filter(iTld => sanify(tld) === iTld).length

const wrapDomain = (url) =>
    url.match(/(?:\/)?((?!www\.)\b\w{1,}\b\..*?)(?:\/|\?|$)/)[1] // Grab the group

const validateDomain = (domain) =>
    sanify(domain).split('.').length > 1 && doesTldExists(domainToTld(sanify(domain)))

const findDomain = (data, patterns) => {
    const domainNamePatterns = patterns.map(pattern => {
        if (pattern.regex?.domainName) return pattern.regex.domainName
        return undefined
    }).filter(domainName => domainName)

    const domainMatches = domainNamePatterns
        .map(regex => data.match(regex)?.slice(-1)?.join()?.trim())
        .filter(match => match)
    
    const record = {
        value: undefined,
        isDomain: false,
        isTld: false
    }

    for (let domain of domainMatches) {
        if (validateDomain(domain)) {
            record.value = sanify(domain)
            record.isDomain = true
            break
        }
    }

    if (!record.isDomain) {
        for (let tld of domainMatches) {
            if (doesTldExists(tld)) {
                record.value = sanify(tld)
                record.isTld = true
                break
            }
        }
    }
    
    return record
}

module.exports = {
    findDomain, wrapDomain,
    tlds, domainToTld
}