#!/usr/bin/env node

import arg from 'arg'
import chalk from 'chalk'
import { range } from './lib/range'
import { isGitHubUsername, getGitHubUserInfo, getGitHubDailyContributions } from './lib/GitHub'
import { mergeMap } from './lib/mergeMap'
import { getOngoingStreak } from './getOngoingStreak'
import { Day } from './lib/Day'

const main = async () => {
  const username = arg({})._[0].replace(/^@/, '')

  if (!isGitHubUsername(username)) {
    throw Error(`@${username} is not valid GitHub username.`)
  }

  // eslint-disable-next-line camelcase
  const { created_at } = await getGitHubUserInfo(username)
  const joinedDay = new Day(created_at)
  const today = Day.today()

  const annualDailyContributionsMaps = await Promise.all(
    range(joinedDay.getFullYear(), today.getFullYear() + 1)
      .map(year => getGitHubDailyContributions(username, year))
  )

  const allDailyContributions = mergeMap(...annualDailyContributionsMaps)
  const { from, to, count } = getOngoingStreak(allDailyContributions)

  if (from && to && count > 0) {
    console.log(`${from.toString()} ~ ${to.toString()} (${count} ${count === 1 ? 'days' : 'day'})`)
  } else {
    console.log('No ongoing streak...')
  }
}

main()
  .catch(({ message }) => {
    console.error(chalk.red(message))
  })
