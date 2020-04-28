/* eslint-disable camelcase */
import type { Day } from './lib/Day'

export type StreakType = {
  from: Day | null
  to: Day | null
  count: number
}

export type StreakStrategyType = (contributions: Map<string, number>) => StreakType

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
