import { GlobalWithFetchMock } from 'jest-fetch-mock'

const customGlobal = global as GlobalWithFetchMock
customGlobal.fetch = require('jest-fetch-mock')
customGlobal.fetch.enableMocks()
customGlobal.fetchMock = customGlobal.fetch
