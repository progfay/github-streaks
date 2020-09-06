import chalk from 'chalk'
import { range } from './lib/range'
import { GitHubUser } from './lib/GitHubUser'
import { mergeMap } from './lib/mergeMap'
import { getLongestStreak } from './getLongestStreak'
import { getCurrentStreak } from './getCurrentStreak'
import { Day } from './lib/Day'
import { formatStreak } from './formatStreak'

const main = async () => {
  const username = process.argv[2]
  const user = new GitHubUser(username)
  const { created_at: createdAt } = await user.getUserInfo()
  const joinedDay = new Day(createdAt)
  const today = Day.today()

  const annualDailyContributionsMaps = await Promise.all(
    range(joinedDay.getFullYear(), today.getFullYear() + 1)
      .map(year => user.getDailyContributions(year))
  )

  const allDailyContributions = mergeMap(...annualDailyContributionsMaps)

  const currentStreak = getCurrentStreak(allDailyContributions)
  const longestStreak = getLongestStreak(new Day(createdAt), Day.today())(allDailyContributions)
  console.log(`Current Streak: ${formatStreak(currentStreak)}`)
  console.log(`Longest Streak: ${formatStreak(longestStreak)}`)
}

main()
  .catch(({ message }) => {
    console.error(chalk.red(message))
  })
