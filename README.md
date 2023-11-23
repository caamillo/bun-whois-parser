# Bun whois parser

### _(WIP) Not tested to ALL tlds_<br>
You can see the regex-patterns in `patterns.js`<br>

(Big thanks to [@moneals](https://github.com/moneals) for writing most of the regex <3)

### How does it work?
1. Makes an object of all the hard coded TLD regex pattern (you can see them inside `patterns.js`).
```js
// Example of regex-pattern, useful to make your regex
{
    tld: 'tld-name',
    regex: {
        domainName: 'domain-name-regex',
        registrar: 'registrar-regex',
        updatedDate: 'updated-date-regex',
        creationDate: 'creation-date-regex',
        expirationDate: 'expiration-date-regex',
        status: 'status-regex'
    },
    etc: {
        notFound: 'regex-to-see-if-available',
        dateFormat: 'the-format-to-parse-date',
        rateLimited: 'custom-whois-message-when-many-requests'
    }
}
// ALL the fields and sub-fields (regex || domainName) are optional except for `tld` attribute
```
2. If a field or a sub-field is not given, they will be overrided by default-pattern `patterns[0]`, so it's top-to-down.
3. Now checks the `tlds.json` file and if a tld is not given, then it makes an empty pattern object (with default-pattern active)
4. Your parse it's ready sir!

## Features
- Fastest whois-parser `~0,04s`,
- Offline and sync,
- Domain name auto detection,
- Domain name wrapper from URL

## TODOs

- [x] Parse dates using `dateFormat` attribute
- [ ] Better `./tlds.json`
- [ ] Use `rateLimited`
- [ ] Make tests to run whois in various tlds to search which one can't be parsed

Please consider to collaborate on that. The more regex-patterns we write, the better it is.
