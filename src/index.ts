#!/usr/bin/env node

import arg from 'arg'
import { range } from './lib/range'
import { getGitHubUserInfo } from './lib/getGitHubUserInfo'
import { getGitHubDailyContributions } from './lib/getGitHubDailyContributions'
import { mergeMap } from './lib/mergeMap'
import { getOngoingContinuousContributions } from './getOngoingContinuousContributions'
import { formatDate } from './lib/formatDate'

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
  const { from, to, count } = getOngoingContinuousContributions(allDailyContributions)

  if (from && to) {
    console.log(`${formatDate(from)} ~ ${formatDate(to)} (${count} ${count > 1 ? 'days' : 'day'})`)
  } else {
    console.log('No ongoing continuous contribution...')
  }
}

main()
