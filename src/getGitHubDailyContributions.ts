import { fetchElements } from './fetchElements'

const GITHUB_USERNAME_REGEXP = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

export async function getGitHubDailyContributions (username: string, year: number) {
  if (!GITHUB_USERNAME_REGEXP.test(username)) {
    throw Error('First argument must be valid GitHub username.')
  }

  if (year <= 0 || !Number.isInteger(year)) {
    throw Error('Second argument must be positive integer.')
  }

  const url = `https://github.com/users/${username}/contributions?from=${year}-12-01&to=${year}-12-31`
  const elements = await fetchElements(url, 'rect.day')
  const map = new Map<string, number>()

  for (const element of elements) {
    const { 'data-date': date, 'data-count': count } = element.attributes
    map.set(date, parseInt(count, 10))
  }

  return map
}
