import chalk from 'chalk'
import { range } from './lib/range'
import { GitHubUser } from './lib/GitHubUser'
import { getLongestStreak } from './getLongestStreak'
import { getCurrentStreak } from './getCurrentStreak'
import { Contributions } from './lib/Contributions'

const main = async () => {
  const username = process.argv[2]
  const user = new GitHubUser(username)
  const { created_at: createdAt } = await user.getUserInfo()
  const joinedYear = parseInt(createdAt.substring(0, 4), 10)
  const thisYear = new Date().getFullYear()

  const annualDailyContributionsMaps = await Promise.all(
    range(joinedYear, thisYear + 1)
      .map(year => user.getAnnualDailyContributions(year))
  )

  const allDailyContributions = Contributions.merge(...annualDailyContributionsMaps)

  const currentStreak = getCurrentStreak(allDailyContributions)
  const longestStreak = getLongestStreak(allDailyContributions)
  console.log(`Current Streak: ${currentStreak.toString()}`)
  console.log(`Longest Streak: ${longestStreak.toString()}`)
}

main()
  .catch(({ message }) => {
    console.error(chalk.red(message))
  })
