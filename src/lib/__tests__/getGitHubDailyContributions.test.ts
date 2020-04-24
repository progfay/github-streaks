/* global fetchMock */
import { getGitHubDailyContributions } from './../GitHub'
import { GitHubDailyContributionsResponse, GitHubDailyContributions } from './data/GitHubDailyContributions.data'

describe('getGitHubDailyContributions(username: string, year: string) function', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('takes string and number, `username` and `year` as arguments', () => {
    describe('`username` must be valid GitHub username.', () => {
      it('getGitHubDailyContributions("!#$%^&*()_+", 2020) throw error.', async () => {
        getGitHubDailyContributions('!#$%^&*()_+', 2020)
          .catch(error => {
            expect(error.message).toEqual('First argument must be valid GitHub username.')
          })
      })

      it('getGitHubDailyContributions("@progfay", 2020) throw error.', async () => {
        getGitHubDailyContributions('@progfay', 2020)
          .catch(error => {
            expect(error.message).toEqual('First argument must be valid GitHub username.')
          })
      })
    })

    describe('`year` must be positive integer.', () => {
      it('getGitHubDailyContributions("progfay", -1) throw error.', async () => {
        getGitHubDailyContributions('progfay', -1)
          .catch(error => {
            expect(error.message).toEqual('Second argument must be positive integer.')
          })
      })

      it('getGitHubDailyContributions("progfay", 2020.5) throw error.', async () => {
        getGitHubDailyContributions('progfay', 2020.5)
          .catch(error => {
            expect(error.message).toEqual('Second argument must be positive integer.')
          })
      })
    })

    describe('return Map object of `username` contributions in `year`', () => {
      it('getGitHubDailyContributions("progfay", 2019) return progfay\'s contributions in 2019.', async () => {
        fetchMock.mockResponseOnce(GitHubDailyContributionsResponse)

        const actual = await getGitHubDailyContributions('progfay', 2019)
        expect(actual).toEqual(GitHubDailyContributions)
      })
    })
  })
})
