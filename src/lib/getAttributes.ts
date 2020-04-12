import type { HTMLElement } from 'fast-html-parser'

type AttributesType = {
  [key: string]: string
}

export const getAttributes = (element: HTMLElement) => {
    const attributes: AttributesType = {}
    for (const attr of element.rawAttrs.split(' ')) {
        const [key, ...value] = attr.split('=')
        attributes[key] = value.join('=').replace(/^"(.*)"$/, '$1')
    }
    return attributes
}