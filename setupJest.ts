import { GlobalWithFetchMock } from 'jest-fetch-mock'

const customGlobal = global as GlobalWithFetchMock
customGlobal.fetch = require('jest-fetch-mock')
customGlobal.fetch.enableMocks()
customGlobal.fetchMock = customGlobal.fetch

// import fetch from 'jest-fetch-mock'
// const fetch = require('jest-fetch-mock')

// global.fetch = fetch
// global.fetchMock = fetch
// jest.mock('node-fetch', () => (global.fetch))
