const patterns = [
    // regex-patterns by Michael Smith (@moneals on GitHub, https://github.com/moneals) <3
	{
		tld: undefined,
		regex: {
			domainName: 'Domain Name: *([^\\s]+)',
			registrar: 'Registrar: *(.+)',
			updatedDate: 'Updated Date: *(.+)',
			creationDate: 'Creat(ed|ion) Date: *(.+)',
			expirationDate: 'Expir\\w+ Date: *(.+)',
			status: 'Status:\\s*(.+)\\s*\\n',
		},
		etc: {
			notFound: '(No match for |Domain not found|NOT FOUND\\s)',
			dateFormat: 'YYYY-MM-DDThh:mm:ssZ'
		}
	},
	{
		tld: 'au',
		regex: {
			domainName: 'Domain Name: *([^\\s]+)',
			registrar: 'Registrar Name: *(.+)',
			updatedDate: 'Last Modified: *(.+)',
			status: 'Status: *(.+)',
		},
		etc: {
			rateLimited: 'WHOIS LIMIT EXCEEDED'
		}
	},
	{
		tld: 'us',
		etc: {
			notFound: '^No Data Found'
		}
	},
	{
		tld: 'ru',
		regex: {
			domainName: 'domain: *([^\\s]+)',
			registrar: 'registrar: *(.+)',
			updatedDate: 'updated on *(.+)',
			creationDate: 'created: *(.+)',
			expirationDate: 'paid-till: *(.+)',
			status: 'state: *(.+)'
		},
		etc: {
			notFound: 'No entries found'
		}
	},
	{
		tld: 'uk',
		regex: {
			domainName: 'Domain name:\\s*([^\\s]+)',
			registrar: 'Registrar:\\s*(.+)',
			updatedDate: 'Last updated:\\s*(.+)',
			creationDate: 'Registered on:\\s*(.+)',
			expirationDate: 'Expiry date:\\s*(.+)',
			status: 'Registration status:\\s*(.+)'
		}
	},
	{
		tld: 'fr',
		regex: {
			domainName: 'domain: *([^\\s]+)',
			registrar: 'registrar: *(.+)',
			updatedDate: 'last-update: *(.+)',
			creationDate: 'created: *(.+)',
			expirationDate: 'Expir\\w+ Date:\\s?(.+)',
			status: 'status: *(.+)',
		}
	},
	{
		tld: 'nl',
		regex: {
			domainName: 'Domain name: *([^\\s]+)',
			registrar: 'Registrar: *\\s*(.+)',
			status: 'Status: *(.+)'
		},
		etc: {
			notFound: ' is free'
		}
	},
	{
		tld: 'fi',
		regex: {
			domainName: 'domain\\.*: *([\\S]+)',
			registrar: 'registrar\\.*: *(.*)',
			updatedDate: 'modified\\.*: *([\\S]+)',
			creationDate: 'created\\.*: *([\\S]+)',
			expirationDate: 'expires\\.*: *([\\S]+)',
			status: 'status\\.*: *([\\S]+)'
		}
	},
	{
		tld: 'jp',
		regex: {
			domainName: '\\[Domain Name\\]\\s*([^\\s]+)',
			registrar: '\\[(登録者名|Registrant)\\]\\s?(.+)',
			updatedDate: '\\[(最終更新|Last Updated)\\]\\s?(.+)',
			creationDate: '\\[(登録年月日|Created on)\\]\\s?(.+)',
			expirationDate: '\\[(有効期限|Expires on)\\]\\s?(.+)',
			status: '\\[(状態|Status)\\]\\s*(.+)'
		},
		etc: {
			notFound: 'No match!!'
		}
	},
	{
		tld: 'pl',
		regex: {
			domainName: 'DOMAIN NAME: *(.+)',
			registrar: 'REGISTRAR: *\\s*(.+)',
			updatedDate: 'last modified: *(.+)',
			creationDate: 'created: *(.+)',
			expirationDate: 'renewal date: *(.+)',
			status: 'Registration status:\\n\\s*(.+)'
		},
		etc: {
			notFound: 'No information available about domain name'
		}
	},
	{
		tld: 'br',
		regex: {
			domainName: 'domain: *([^\\s]+)\n',
			updatedDate: 'changed: *(.+)',
			creationDate: 'created: *(.+)',
			expirationDate: 'expires: *(.+)',
			status: 'status: *(.+)'
		}
	},
	{
		tld: 'eu',
		regex: {
			domainName: 'Domain: *([^\\n\\r]+)',
			registrar: 'Registrar: *\\n *Name: *([^\\n\\r]+)'
		},
		etc: {
			notFound: 'Status:\\s+AVAILABLE'
		}
	},
	{
		tld: 'ee',
		regex: {
			domainName: 'Domain: *[\\n\\r]+\s*name: *([^\\n\\r]+)',
			registrar: 'Registrar: *[\\n\\r]+\\s*name: *([^\\n\\r]+)',
			updatedDate: 'Domain: *[\\n\\r]+\\s*name: *[^\\n\\r]+\\sstatus: *[^\\n\\r]+\\sregistered: *[^\\n\\r]+\\schanged: *([^\\n\\r]+)',
			creationDate: 'Domain: *[\\n\\r]+\\s*name: *[^\\n\\r]+\\sstatus: *[^\\n\\r]+\\sregistered: *([^\\n\\r]+)',
			expirationDate: 'Domain: *[\\n\\r]+\\s*name: *[^\\n\\r]+\\sstatus: *[^\\n\\r]+\\sregistered: *[^\\n\\r]+\\schanged: *[^\\n\\r]+\\sexpire: *([^\\n\\r]+)',
			status: 'Domain: *[\\n\\r]+\\s*name: *[^\\n\\r]+\\sstatus: *([^\\n\\r]+)'
		}
	},
	{
		tld: 'kr',
		regex: {
			domainName: 'Domain Name\\s*: *([^\\s]+)',
			registrar: 'Authorized Agency\\s*: *(.+)',
			updatedDate: 'Last Updated Date\\s*: *(.+)',
			creationDate: 'Registered Date\\s*: *(.+)',
			expirationDate: 'Expiration Date\\s*: *(.+)'
		},
		etc: {
			notFound: 'The requested domain was not found',
			dateFormat: 'YYYY. MM. DD.'
		}
	},
	{
		tld: 'bg',
		regex: {
			domainName: 'DOMAIN NAME: *([^\\s]+)',
			status: 'registration status:\\s*(.+)',
		},
		etc: {
			notFound: 'registration status: available',
			rateLimited: 'Query limit exceeded'
		}
	},
	{
		tld: 'de',
		regex: {
			domainName: 'Domain: *([^\\s]+)',
			updatedDate: 'Changed: *(.+)',
			status: 'Status: *(.+)'
		},
		etc: {
			notFound: 'Status: *free'
		}
	},
	{
		tld: 'at',
		regex: {
			domainName: 'domain: *([^\\s]+)',
			registrar: 'registrar: *(.+)',
			updatedDate: 'changed: *(.+)'
		},
		etc: {
			notFound: ' nothing found',
			dateFormat: 'YYYYMMDD hh:mm:ss',
			rateLimited: 'Quota exceeded'
		}
	},
	{
		tld: 'ca',
		etc: {
			notFound: 'Not found: '
		}
	},
	{
		tld: 'be',
		regex: {
			domainName: 'Domain:\\s*([^\\s]+)',
			registrar: 'Registrar: *[\\n\\r]+\\s*Name:\\s*(.+)',
			creationDate: 'Registered: *(.+)',
			status: 'Status:\\s*(.+)'
		},
		etc: {
			notFound: 'Status:\\s*AVAILABLE',
			dateFormat: 'ddd MMM DD YYYY'
		}
	},
	{
		tld: 'info',
		etc: {
			notFound: '^(NOT FOUND|Domain not found)',
			dateFormat: 'YYYY-MM-DDTHH:mm:ssZ'
		}
	},
	{
		tld: 'kg',
		regex: {
			domainName: 'Domain\\s*([^\\s]+)',
			registrar: 'Domain support: \\s*(.+)',
			updatedDate: 'Record last updated on:\\s*(.+)',
			creationDate: 'Record created:\\s*(.+)',
			expirationDate: 'Record expires on:\\s*(.+)'
		},
		etc: {
			dateFormat: 'ddd MMM DD HH:mm:ss YYYY',
			notFound: 'domain is available for registration'
		}
	},
	{
		tld: 'ch',
		regex: {
			domainName: 'Domain name: *(.+)',
			registrar: 'Registrar: *(.+)',
			creationDate: 'First registration date: *(.+)',
		},
		etc: {
			notFound: 'We do not have an entry in our database matching your query',
			dateFormat: 'DD MMM YYYY',
			rateLimited: 'Please wait a moment and try again.'
		}
	},
	{
		tld: 'id',
		regex: {
			domainName: 'Domain Name: ([^\\s]+)',
			registrar: 'Sponsoring Registrar Organization:(.+)',
			updatedDate: 'Last Updated On: (.+)',
			creationDate: 'Created On: (.+)',
			expirationDate: 'Expiration Date: (.+)',
			status: 'Status:(.+)'
		},
		etc: {
			notFound: 'DOMAIN NOT FOUND',
			dateFormat: 'YYYY-MM-DD HH:mm:ss'
		}
	},
	{
		tld: 'sk',
		regex: {
			domainName: 'Domain:\\s*([^\\s]+)',
			registrar: 'Registrar:\\s*(.+)',
			updatedDate: 'Updated:\\s*(.+)',
			creationDate: 'Created:\\s*(.+)',
			expirationDate: 'Valid Until:\\s*(.+)',
			status: 'Status:\\s*(.+)'
		},
		etc: {
			notFound: 'Domain not found',
			dateFormat: 'YYYY-MM-DD'
		}
	},
	{
		tld: 'se',
		regex: {
			domainName: 'domain\\.*: *([^\\s]+)',
			registrar: 'registrar: *(.+)',
			updatedDate: 'modified\\.*: *(.+)',
			creationDate: 'created\\.*: *(.+)',
			expirationDate: 'expires\\.*: *(.+)',
			status: 'status\\.*: *(.+)'
		},
		etc: {
			notFound: '\\" not found.',
			dateFormat: 'YYYY-MM-DD'
		}
	},
	{
		tld: 'is',
		regex: {
			domainName: 'domain\\.*: *([^\\s]+)',
			creationDate: 'created\\.*: *(.+)',
			expirationDate: 'expires\\.*: *(.+)'
		},
		etc: {
			dateFormat: 'MMM DD YYYY',
			notFound: 'No entries found for query'
		}
	},
	{
		tld: 'co',
		etc: {
			notFound: 'No Data Found'
		}
	},
	// My custom tld-patterns
	// custom-regex format: { tld<Str> && (regex<Obj> || etc<Obj>) }
	{
		tld: 'it',
		regex: {
			domainName: 'Domain: *(.+)',
			registrar: 'Registrar*[\\n\\r]+\\s*Organization:\\s*(.+)',
			updatedDate: 'Last Update: *(.+)',
			creationDate: 'Created: *(.+)',
			expirationDate: 'Expire Date: *(.+)'
		},
		etc: {
			notFound: 'Status:\\s+AVAILABLE',
			dateFormat: 'YYYY-MM-DD HH:mm:ss'
		}
	}
]

module.exports = async () => {
	let tlds = await Bun.file('./src/utils/whois/tlds.json').json()
	tlds = tlds.map(tld => tld.toLowerCase())
	tlds.map(tld => !patterns.filter(el => el.tld === tld).length ? patterns.push({ tld: tld }) : '')
	return patterns
}	