import fetch from 'node-fetch'
import HTML from 'fast-html-parser'

export const fetchElements = async (url: string, selector: string): Promise<HTML.HTMLElement[]> => {
  if (!/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(url)) {
    throw new Error('First argument must be valid HTTP URL.')
  }

  if (!selector) {
    throw new Error('Second argument must be not empty.')
  }

  const response = await fetch(url)
  const html = await response.text()
  const root = HTML.parse(html, {
    lowerCaseTagName: false,
    script: false,
    style: false,
    pre: false
  })
  const elements = root.querySelectorAll(selector)
  return elements
}
