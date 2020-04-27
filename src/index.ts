#!/usr/bin/env node

import arg from 'arg'
import chalk from 'chalk'
import { range } from './lib/range'
import { GitHubUser } from './lib/GitHubUser'
import { mergeMap } from './lib/mergeMap'
import { getLongestStreak } from './getLongestStreak'
import { getOngoingStreak } from './getOngoingStreak'
import { Day } from './lib/Day'

const ARG_OPTIONS = {
  '--longest': Boolean
}

const main = async () => {
  const {
    '--longest': longestFlag = false,
    _: [username = '']
  } = arg(ARG_OPTIONS)
  const user = new GitHubUser(username)

  // eslint-disable-next-line camelcase
  const { created_at } = await user.getUserInfo()
  const joinedDay = new Day(created_at)
  const today = Day.today()

  const annualDailyContributionsMaps = await Promise.all(
    range(joinedDay.getFullYear(), today.getFullYear() + 1)
      .map(year => user.getDailyContributions(year))
  )

  const allDailyContributions = mergeMap(...annualDailyContributionsMaps)

  if (longestFlag) {
    const { from, to, count } = getLongestStreak(allDailyContributions, new Day('1989-01-01'), Day.today())
    if (from && to && count > 0) {
      console.log(`${from.toString()} ~ ${to.toString()} (${count} ${count === 1 ? 'days' : 'day'})`)
    } else {
      console.log('No streak...')
    }
  } else {
    const { from, to, count } = getOngoingStreak(allDailyContributions)
    if (from && to && count > 0) {
      console.log(`${from.toString()} ~ ${to.toString()} (${count} ${count === 1 ? 'days' : 'day'})`)
    } else {
      console.log('No ongoing streak...')
    }
  }
}

main()
  .catch(({ message }) => {
    console.error(chalk.red(message))
  })
