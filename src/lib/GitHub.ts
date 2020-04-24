import fetch from 'node-fetch'
import { fetchElements } from './fetchElements'
import type { GitHubUserInfoType } from '../type'

const GITHUB_USERNAME_REGEXP = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

export const isGitHubUsername = (username: string) => GITHUB_USERNAME_REGEXP.test(username)

export const getGitHubUserInfo = async (username: string): Promise<GitHubUserInfoType> => {
  if (!isGitHubUsername(username)) {
    throw Error('First argument must be valid GitHub username.')
  }

  const response = await fetch(`https://api.github.com/users/${username}`)
  const information = await response.json()

  if (!information.id) throw Error(information.message || JSON.stringify(information))

  return information as GitHubUserInfoType
}

export async function getGitHubDailyContributions (username: string, year: number) {
  if (!isGitHubUsername(username)) {
    throw Error('First argument must be valid GitHub username.')
  }

  if (year <= 0 || !Number.isInteger(year)) {
    throw Error('Second argument must be positive integer.')
  }

  const url = `https://github.com/users/${username}/contributions?from=${year}-12-01&to=${year}-12-31`
  const elements = await fetchElements(url, 'rect.day')
  const map = new Map<string, number>()

  for (const { attributes } of elements) {
    const { 'data-date': date, 'data-count': count } = attributes
    map.set(date, parseInt(count, 10))
  }

  return map
}
