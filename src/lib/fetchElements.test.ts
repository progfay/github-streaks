/* global fetchMock */
import { fetchElements } from './fetchElements'

describe('fetchElements(url: string, selector: string): function', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('takes 2 strings, `url` and `selector` as arguments', () => {
    describe('`url` must be valid HTTP URL.', () => {
      it('fetchElements("/dev/null", "div") throw error.', async () => {
        fetchElements('/dev/null', 'div')
          .catch(error => {
            expect(error.message).toEqual('First argument must be valid HTTP URL.')
          })
      })

      it('fetchElements("ftp://example.com", "div") throw error.', async () => {
        fetchElements('ftp://example.com', 'div')
          .catch(error => {
            expect(error.message).toEqual('First argument must be valid HTTP URL.')
          })
      })
    })

    describe('`selector` must be not empty', () => {
      it('fetchElements("https://example.com", "") throw error.', () => {
        fetchElements('https://example.com', '')
          .catch(error => {
            expect(error.message).toEqual('Second argument must be not empty.')
          })
      })
    })
  })

  describe('return all elements what selector is matched to HTML of `url`', () => {
    it('fetchElements function return multiple elements.', async () => {
      fetchMock.mockResponseOnce(`
      <body>
          <div class="target">0</div>
          <div class="target">1</div>
          <div class="target">2</div>
      </body>
    `)

      const actual = await fetchElements('https://example.com', 'div.target')
      expect(actual.length).toEqual(3)
    })
  })
})
