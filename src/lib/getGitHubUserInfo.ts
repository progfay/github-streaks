/* eslint-disable camelcase */
import fetch from 'node-fetch'

const GITHUB_USERNAME_REGEXP = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

export type GitHubUserInfoType = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: false
  name: string
  company: string
  blog: string
  location: string
  email: string | null
  hireable: boolean | null
  bio: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export const getGitHubUserInfo = async (username: string): Promise<GitHubUserInfoType> => {
  if (!GITHUB_USERNAME_REGEXP.test(username)) {
    throw Error('First argument must be valid GitHub username.')
  }

  const response = await fetch(`https://api.github.com/users/${username}`)
  const information = await response.json()

  if (!information.id) {
    throw Error(information.message || '')
  }

  return information as GitHubUserInfoType
}
