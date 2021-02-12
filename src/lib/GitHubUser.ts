import { tokenize } from 'simple-html-tokenizer'
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
    const html = await fetch(`https://github.com/users/${this.username}/contributions?from=${year}-12-01&to=${year}-12-31`)
    const tokens = tokenize(html, {
      loc: false,
      mode: 'codemod'
    })

    const contributions: Contribution[] = []

    for (const token of tokens) {
      if (token.type !== 'StartTag' || token.tagName !== 'rect') continue
      const [, className] = token.attributes.find(attribute => attribute[0] === 'class') ?? []
      if (className !== 'ContributionCalendar-day') continue
      const [, date] = token.attributes.find(attribute => attribute[0] === 'data-date') ?? []
      const [, count] = token.attributes.find(attribute => attribute[0] === 'data-count') ?? []
      if (!count || !date || !date.startsWith(`${year}-`)) continue
      contributions.push({
        day: date,
        count: parseInt(count, 10)
      })
    }

    return contributions
  }
}
