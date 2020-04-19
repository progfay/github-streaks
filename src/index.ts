#!/usr/bin/env node

import { range } from './range'
import { getGitHubUserInfo } from './getGitHubUserInfo'
import { getGitHubDailyContributions } from './getGitHubDailyContributions'
import { formatDate } from './formatDate'
import { mergeMap } from './mergeMap'
import { dayPeriodGenerator } from './dayPeriodGenerator'

const main = async () => {
  const username = process.argv[2].replace(/^@/, '')

  // eslint-disable-next-line camelcase
  const { created_at } = await getGitHubUserInfo(username)
  const joinedYear = parseInt(created_at.substring(0, 4), 10)
  const currentDate = new Date()

  const annualDailyContributionsMaps = await Promise.all(
    range(joinedYear, currentDate.getFullYear() + 1)
      .map(year => getGitHubDailyContributions(username, year))
  )

  const allDailyContributions = mergeMap(...annualDailyContributionsMaps)

  let count = 0
  let startDate = formatDate(currentDate)
  for (const date of dayPeriodGenerator(new Date(), new Date(created_at))) {
    const key = formatDate(date)
    const contribution = allDailyContributions.get(key)
    if (contribution === 0) break
    count++
    startDate = key
  }

  console.log(`${startDate} ~ ${formatDate(currentDate)} (${count} ${count > 1 ? 'days' : 'day'})`)
}

main()
