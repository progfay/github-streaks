const fetch = require('node-fetch')
const { parse } = require('fast-html-parser')

const parseAttrs = (attrs) => {
  const parsedAttrs = {}
  for (const attr of attrs) {
    const [key, ...value] = attr.split('=')
    parsedAttrs[key] = value.join('=').replace(/^"(.*)"$/, '$1')
  }
  return parsedAttrs
}

fetch(`https://github.com/${encodeURIComponent(process.argv[2])}`)
  .then(response => response.text())
  .then(text => parse(text, { lowerCaseTagName: false, script: false, style: false, pre: false }))
  .then(doc => doc.querySelectorAll('rect.day'))
  .then(days => days.map(day => parseAttrs(day.rawAttrs.split(' '))))
  .then(days => days.map(day => ({ date: day['data-date'], count: parseInt(day['data-count'], 10) })))
  .then(days => days.sort((a, b) => a.date < b.date ? 1 : -1))
  .then(days => days.findIndex(day => day.count === 0))
  .then(console.log)
