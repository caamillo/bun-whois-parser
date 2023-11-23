const findDomain = (data, patterns) => {
    const domainNamePatterns = patterns.map(pattern => {
        if (pattern.regex?.domainName) return pattern.regex.domainName
        return undefined
    }).filter(domainName => domainName)

    const domainMatches = domainNamePatterns
        .map(regex => data.match(regex)?.slice(-1)?.join()?.trim())
        .filter(match => match)
    
    let average = 0
    const matches = domainMatches.map(match => {
        average += match.length
        return match.length
    }).filter(match => match)
    average /= matches.length

    let record = 0
    for (let match in matches) {
        if (!match) return
        const near = Math.abs(matches[match] - average)
        const nearRecord = Math.abs(matches[record] - average)

        if (near < nearRecord) record = match
    }

    return domainMatches[record]
}

module.exports = {
    findDomain
}