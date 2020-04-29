#!/usr/bin/env node

import arg from 'arg'
import chalk from 'chalk'
import { range } from './lib/range'
import { GitHubUser } from './lib/GitHubUser'
import { mergeMap } from './lib/mergeMap'
import { getLongestStreak } from './getLongestStreak'
import { getOngoingStreak } from './getOngoingStreak'
import { Day } from './lib/Day'
import { showStreak } from './showStreak'

const ARG_OPTIONS = {
  '--longest': Boolean,
  '--since': String,
  '--until': String
}

const main = async () => {
  const {
    '--longest': longestFlag = false,
    '--since': since = '',
    '--until': until = Day.today().toString(),
    _: [username = '']
  } = arg(ARG_OPTIONS)

  const user = new GitHubUser(username)
  const { created_at: createdAt } = await user.getUserInfo()
  const joinedDay = new Day(createdAt)
  const today = Day.today()

  const annualDailyContributionsMaps = await Promise.all(
    range(joinedDay.getFullYear(), today.getFullYear() + 1)
      .map(year => user.getDailyContributions(year))
  )

  const allDailyContributions = mergeMap(...annualDailyContributionsMaps)
  showStreak(
    allDailyContributions,
    longestFlag
      ? getLongestStreak(new Day(since || createdAt), new Day(until))
      : getOngoingStreak
  )
}

main()
  .catch(({ message }) => {
    console.error(chalk.red(message))
  })
