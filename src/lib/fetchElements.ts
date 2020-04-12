import fetch from 'node-fetch'
import { parse } from 'fast-html-parser'

import type { HTMLElement } from 'fast-html-parser'

export const fetchElements = async (url: string, selector: string): Promise<HTMLElement[]> => {
    const response = await fetch(url)
    const html = await response.text()
    const root = parse(html, {
      lowerCaseTagName: false,
      script: false,
      style: false,
      pre: false
    })
    const elements = root.querySelectorAll(selector)
    return elements
}
