const tlds = require('./tlds.json')

const domainToTld = (domain) =>
    domain.trim().split('.').slice(-1).join().toLowerCase() // That seems wrong, because .co.br would be wrapped into .br; but trust me it works

const doesTldExists = (tld) =>
    tlds.filter(iTld => tld === iTld).length

const wrapDomain = (url) =>
    url.match(/(?:\/)?((?!www\.)\b\w{1,}\b\..*?)(?:\/|\?|$)/)[1] // Grab the group

const validateDomain = (domain) =>
    domain.trim().split('.').length > 1 && doesTldExists(domainToTld(domain))

const findDomain = (data, patterns) => {
    const domainNamePatterns = patterns.map(pattern => {
        if (pattern.regex?.domainName) return pattern.regex.domainName
        return undefined
    }).filter(domainName => domainName)

    const domainMatches = domainNamePatterns
        .map(regex => data.match(regex)?.slice(-1)?.join()?.trim())
        .filter(match => match)
    
    let record
    for (let domain of domainMatches) {
        if (validateDomain(domain.trim())) {
            record = domain.trim()
            break
        }
    }

    return record
}

module.exports = {
    findDomain, wrapDomain,
    tlds, domainToTld
}