/* global fetchMock */
import { GitHubUser } from '../GitHubUser'
import {
  GitHubUserInfoResponse,
  GitHubDailyContributionsResponse,
  GitHubDailyContributions
} from './data/GitHubUser.data'

describe('GitHubUser class', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('constructor(username: string)', () => {
    describe('takes a string, `username` as argument', () => {
      describe('`username` must be valid GitHub username.', () => {
        it('new GitHubUser("!#$%^&*()_+") throw error.', () => {
          expect(() => new GitHubUser('!#$%^&*()_+')).toThrow('First argument must be valid GitHub username.')
        })
      })

      describe('`username` may start with the @', () => {
        it('new GitHubUser("@progfay") will succeed.', () => {
          expect(() => new GitHubUser('@progfay')).not.toThrow()
        })
      })
    })
  })

  describe('GitHubUser.isGitHubUsername(username: string) static method', () => {
    describe('takes a string, `username` as argument', () => {
      describe('`username` must be valid GitHub username.', () => {
        it('new GitHubUser("!#$%^&*()_+") throw error.', () => {
          expect(() => new GitHubUser('!#$%^&*()_+')).toThrow('First argument must be valid GitHub username.')
        })
      })

      describe('`username` may start with the @', () => {
        it('new GitHubUser("@progfay") will succeed.', () => {
          expect(() => new GitHubUser('@progfay')).not.toThrow()
        })
      })
    })

    describe('return boolean of whether `username` is valid  GitHub username', () => {
      it('GitHubUser.isGitHubUsername("!#$%^&*()_+") return false.', () => {
        expect(GitHubUser.isGitHubUsername('!#$%^&*()_+')).toEqual(false)
      })

      it('GitHubUser.isGitHubUsername("@progfay") return true.', () => {
        expect(GitHubUser.isGitHubUsername('@progfay')).toEqual(true)
      })
    })
  })

  describe('getGitHubUserInfo() method', () => {
    describe('return information of `username` at GitHub', () => {
      describe('user must exists on GitHub', () => {
        it('new GitHubUser("NOT-EXIST-USER").getUserInfo() throw error.', async () => {
          const information = {
            message: 'Not Found',
            documentation_url: 'https://developer.github.com/v3/users/#get-a-single-user'
          }

          fetchMock.mockResponseOnce(JSON.stringify(information))

          new GitHubUser('NOT-EXIST-USER').getUserInfo()
            .catch(error => {
              expect(error.message).toEqual(information.message)
            })
        })
      })

      it('new GitHubUser("progfay").getUserInfo() function return multiple elements.', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(GitHubUserInfoResponse))

        new GitHubUser('progfay').getUserInfo()
          .then(info => {
            expect(info).toEqual(GitHubUserInfoResponse)
          })
      })
    })
  })

  describe('getDailyContributions(year: string) method', () => {
    let user: GitHubUser

    beforeEach(() => {
      user = new GitHubUser('progfay')
    })

    describe('takes a number, `year` as argument', () => {
      describe('`year` must be positive integer.', () => {
        it('new GitHubUser("progfay").getDailyContributions(-1) throw error.', async () => {
          user.getDailyContributions(-1)
            .catch(error => {
              expect(error.message).toEqual('Second argument must be positive integer.')
            })
        })

        it('new GitHubUser("progfay").getDailyContributions(2020.5) throw error.', async () => {
          user.getDailyContributions(2020.5)
            .catch(error => {
              expect(error.message).toEqual('Second argument must be positive integer.')
            })
        })
      })

      describe('return Map object of user contributions in `year`', () => {
        describe('user must exists on GitHub', () => {
          it('new GitHubUser("NOT-EXIST-USER").getDailyContributions(2019) throw error.', async () => {
            fetchMock.mockResponseOnce('Not Found')

            new GitHubUser('NOT-EXIST-USER').getDailyContributions(2019)
              .catch(error => {
                expect(error.message).toEqual('No contributions found.')
              })
          })
        })

        it('new GitHubUser("progfay").getDailyContributions(2019) return progfay\'s contributions in 2019.', async () => {
          fetchMock.mockResponseOnce(GitHubDailyContributionsResponse)

          const actual = await user.getDailyContributions(2019)
          expect(actual).toEqual(GitHubDailyContributions)
        })
      })
    })
  })
})
