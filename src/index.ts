#!/usr/bin/env node

import arg from 'arg'
import { range } from './lib/range'
import { getGitHubUserInfo } from './lib/getGitHubUserInfo'
import { getGitHubDailyContributions } from './lib/getGitHubDailyContributions'
import { mergeMap } from './lib/mergeMap'
import { getOngoingContinuousContributions } from './getOngoingContinuousContributions'
import { Day } from './lib/Day'

const main = async () => {
  const username = arg({})._[0].replace(/^@/, '')

  // eslint-disable-next-line camelcase
  const { created_at } = await getGitHubUserInfo(username)
  const joinedYear = parseInt(created_at.substring(0, 4), 10)
  const today = Day.today()

  const annualDailyContributionsMaps = await Promise.all(
    range(joinedYear, today.getFullYear() + 1)
      .map(year => getGitHubDailyContributions(username, year))
  )

  const allDailyContributions = mergeMap(...annualDailyContributionsMaps)
  const { from, to, count } = getOngoingContinuousContributions(allDailyContributions)

  if (from && to && count > 0) {
    console.log(`${from.toString()} ~ ${to.toString()} (${count} ${count === 1 ? 'days' : 'day'})`)
  } else {
    console.log('No ongoing continuous contribution...')
  }
}

main()
