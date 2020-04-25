import fetch from 'node-fetch'
import { fetchElements } from './fetchElements'
import type { GitHubUserInfoType } from '../type'

const GITHUB_USERNAME_REGEXP = /^@?[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

export class GitHubUser {
  username: string

  constructor (username: string) {
    if (!GitHubUser.isGitHubUsername(username)) {
      throw Error('First argument must be valid GitHub username.')
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

  async getDailyContributions (year: number) {
    if (year <= 0 || !Number.isInteger(year)) {
      throw Error('Second argument must be positive integer.')
    }

    const url = `https://github.com/users/${this.username}/contributions?from=${year}-12-01&to=${year}-12-31`
    const elements = await fetchElements(url, 'rect.day')

    if (elements.length === 0) throw new Error('No contributions found.')

    const map = new Map<string, number>()

    for (const { attributes } of elements) {
      const { 'data-date': date, 'data-count': count } = attributes
      map.set(date, parseInt(count, 10))
    }

    return map
  }
}
