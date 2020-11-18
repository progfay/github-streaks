import HTML from 'fast-html-parser'
import { fetch } from './fetch'

import type { Contribution, GitHubUserInfoType } from '../type'

const GITHUB_USERNAME_REGEXP = /^@?[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

export class GitHubUser {
  username: string

  constructor (username: string) {
    if (!GitHubUser.isGitHubUsername(username)) {
      throw Error(`Invalid GitHub username: ${username}`)
    }

    this.username = username.replace(/^@/, '')
  }

  static isGitHubUsername (username: string): boolean {
    return GITHUB_USERNAME_REGEXP.test(username)
  }

  async getUserInfo (): Promise<GitHubUserInfoType> {
    const text = await fetch({
      protocol: 'https:',
      hostname: 'api.github.com',
      path: `/users/${this.username}`,
      headers: { 'User-Agent': '@progfay/github-streaks' }
    })

    try {
      const information = JSON.parse(text)
      if (!information.id) throw Error()
      return information as GitHubUserInfoType
    } catch {
      throw new Error(text)
    }
  }

  async getAnnualDailyContributions (year: number): Promise<Contribution[]> {
    if (year <= 0 || !Number.isInteger(year)) {
      throw Error('Second argument must be positive integer.')
    }

    const html = await fetch(`https://github.com/users/${this.username}/contributions?from=${year}-12-01&to=${year}-12-31`)
    const root = HTML.parse(html, {
      lowerCaseTagName: false,
      script: false,
      style: false,
      pre: false
    })
    const elements = root.querySelectorAll('rect.day')

    if (elements.length === 0) throw new Error('No contributions found.')

    const contributions: Contribution[] = []

    for (const { attributes } of elements) {
      const { 'data-date': date, 'data-count': count } = attributes
      if (!date.startsWith(`${year}-`)) continue
      contributions.push({
        day: date,
        count: parseInt(count, 10)
      })
    }

    return contributions
  }
}
