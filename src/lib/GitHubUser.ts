import fetch from 'node-fetch'
import { fetchElements } from './fetchElements'
import { Contributions } from './Contributions'

import type { Contribution, GitHubUserInfoType } from '../type'
// import { Day } from './Day'

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
    const response = await fetch(`https://api.github.com/users/${this.username}`)
    const information = await response.json()

    if (!information.id) throw Error(information.message || JSON.stringify(information))

    return information as GitHubUserInfoType
  }

  async getAnnualDailyContributions (year: number): Promise<Contributions> {
    if (year <= 0 || !Number.isInteger(year)) {
      throw Error('Second argument must be positive integer.')
    }

    const url = `https://github.com/users/${this.username}/contributions?from=${year}-12-01&to=${year}-12-31`
    const elements = await fetchElements(url, 'rect.day')

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

    return new Contributions(contributions)
  }
}
