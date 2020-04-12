import fetch from 'node-fetch'
import HTML from 'fast-html-parser'

export const fetchElements = async (url: string, selector: string): Promise<HTML.HTMLElement[]> => {
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
