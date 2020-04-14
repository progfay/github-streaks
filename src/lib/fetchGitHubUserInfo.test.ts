/* global fetchMock */
import { fetchGitHubUserInfo } from './fetchGitHubUserInfo'

describe('fetchGitHubUserInfo(username: string) function', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('takes a string, `username` as argument', () => {
    describe('`username` must be valid GitHub username.', () => {
      it('fetchGitHubUserInfo("!#$%^&*()_+") throw error.', async () => {
        fetchGitHubUserInfo('!#$%^&*()_+')
          .catch(error => {
            expect(error.message).toEqual('First argument must be valid GitHub username.')
          })
      })

      it('fetchGitHubUserInfo("@progfay") throw error.', async () => {
        fetchGitHubUserInfo('@progfay')
          .catch(error => {
            expect(error.message).toEqual('First argument must be valid GitHub username.')
          })
      })
    })

    describe('`username` must exists on GitHub as a user', () => {
      it('fetchGitHubUserInfo("NOT-EXIST-USER") throw error.', async () => {
        const information = {
          message: 'Not Found',
          documentation_url: 'https://developer.github.com/v3/users/#get-a-single-user'
        }

        fetchMock.mockResponseOnce(JSON.stringify(information))

        fetchGitHubUserInfo('NOT-EXIST-USER')
          .catch(error => {
            expect(error.message).toEqual(information.message)
          })
      })
    })
  })

  describe('return information of `username` at GitHub', () => {
    it('fetchGitHubUserInfo("progfay") function return multiple elements.', async () => {
      const information = {
        login: 'progfay',
        id: 19568747,
        node_id: 'MDQ6VXNlcjE5NTY4NzQ3',
        avatar_url: 'https://avatars1.githubusercontent.com/u/19568747?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/progfay',
        html_url: 'https://github.com/progfay',
        followers_url: 'https://api.github.com/users/progfay/followers',
        following_url: 'https://api.github.com/users/progfay/following{/other_user}',
        gists_url: 'https://api.github.com/users/progfay/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/progfay/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/progfay/subscriptions',
        organizations_url: 'https://api.github.com/users/progfay/orgs',
        repos_url: 'https://api.github.com/users/progfay/repos',
        events_url: 'https://api.github.com/users/progfay/events{/privacy}',
        received_events_url: 'https://api.github.com/users/progfay/received_events',
        type: 'User',
        site_admin: false,
        name: 'Shunsuke Mano',
        company: 'Web Frontend Engineer',
        blog: 'https://twitter.com/progfay',
        location: 'Tokyo, Japan',
        email: null,
        hireable: null,
        bio: null,
        public_repos: 89,
        public_gists: 3,
        followers: 26,
        following: 26,
        created_at: '2016-05-25T09:24:46Z',
        updated_at: '2020-04-13T01:51:28Z'
      }

      fetchMock.mockResponseOnce(JSON.stringify(information))

      fetchGitHubUserInfo('NOT-EXIST-USER')
        .then(info => {
          expect(info).toEqual(information)
        })
    })
  })
})
