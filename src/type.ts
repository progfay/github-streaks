/* eslint-disable camelcase */
import { Streak } from './lib/Streak'

export interface Contribution {
  day: string
  count: number
}

export interface Statistics {
  from: string
  to: string
  days: number
  sum: number
  median: number
  max: number
  min: number
  stddev: number
}

export type StreakStrategyType = (contributions: Contribution[]) => Streak

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
  site_admin: boolean
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
