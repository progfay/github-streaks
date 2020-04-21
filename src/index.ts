#!/usr/bin/env node

import arg from 'arg'
import { range } from './lib/range'
import { getGitHubUserInfo } from './lib/getGitHubUserInfo'
import { getGitHubDailyContributions } from './lib/getGitHubDailyContributions'
import { formatDate } from './lib/formatDate'
import { mergeMap } from './lib/mergeMap'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'

const main = async () => {
  const username = arg({})._[0].replace(/^@/, '')

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
