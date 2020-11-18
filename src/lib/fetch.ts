import https from 'https'
import type { URL } from 'url'

export const fetch = (options: string | https.RequestOptions | URL) => new Promise<string>((resolve, reject) => {
  let text = ''
  https.get(options,
    res => {
      res.setEncoding('utf-8')
      res.on('data', (chunk) => { text += chunk.toString() })
      res.on('end', () => resolve(text))
      res.on('error', reject)
    })
})
