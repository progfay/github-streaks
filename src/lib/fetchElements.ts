import https from 'https'
import HTML from 'fast-html-parser'

export const fetchElements = async (url: string, selector: string): Promise<HTML.HTMLElement[]> => {
  if (!/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(url)) {
    throw new Error('First argument must be valid HTTP URL.')
  }

  if (!selector) {
    throw new Error('Second argument must be not empty.')
  }

  const html = await new Promise<string>((resolve, reject) => {
    let text = ''
    https.get(url, res => {
      res.setEncoding('utf-8')
      res.on('data', (chunk) => { text += chunk.toString() })
      res.on('end', () => resolve(text))
      res.on('error', reject)
    })
  })

  const root = HTML.parse(html, {
    lowerCaseTagName: false,
    script: false,
    style: false,
    pre: false
  })
  const elements = root.querySelectorAll(selector)
  return elements
}
