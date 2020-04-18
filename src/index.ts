#!/usr/bin/env node

import { range } from './range'
import { getGitHubUserInfo } from './getGitHubUserInfo'
import { getGitHubDailyContributions } from './getGitHubDailyContributions'
import { formatDate } from './formatDate'
import { mergeMap } from './mergeMap'

const main = async () => {
  const username = process.argv[2].replace(/^@/, '')

  // eslint-disable-next-line camelcase
  const { created_at } = await getGitHubUserInfo(username)
  const joinedYear = parseInt(created_at.substring(0, 4), 10)
  const currentDate = new Date()

  const years = await Promise.all(
    range(joinedYear, currentDate.getFullYear() + 1)
      .map(year => getGitHubDailyContributions(username, year))
  )

  const days = [...mergeMap(...years)].sort((a, b) => a[0] < b[0] ? 1 : -1)
  const today = formatDate(currentDate)
  const todayIndex = days.findIndex(day => day[0] === today)

  console.log(days.splice(todayIndex).findIndex(day => day[1] === 0))
}

main()
