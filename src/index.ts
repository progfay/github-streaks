import chalk from 'chalk'
import { range } from './lib/range'
import { GitHubUser } from './lib/GitHubUser'
import { getLongestStreak } from './getLongestStreak'
import { getCurrentStreak } from './getCurrentStreak'
import { convertToTable } from './lib/convertToTable'
import { Statistics } from './type'
import { calcContributionsStatistics } from './lib/calcContributionsStatistics'

interface Row {
  'Category': string
  'From    ~     To ': string
  'Day Count': string
  'Sum': string
  'Max': string
  'Min': string
  'Median': string
  'Distrib': string
}

const convertStatisticsToRow = (category: string, statistics: Statistics): Row => ({
  Category: category,
  'From    ~     To ': statistics.days > 0 ? `${statistics.from} ~ ${statistics.to}` : '',
  'Day Count': statistics.days.toString() + (statistics.days > 1 ? 'days' : 'day'),
  Sum: statistics.sum.toString(),
  Max: statistics.max.toString(),
  Min: statistics.min.toString(),
  Median: statistics.median.toFixed(2),
  Distrib: statistics.distribution.toFixed(2)
})

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

  const allDailyContributions = annualDailyContributionsMaps.flat()
  const currentStreak = getCurrentStreak(allDailyContributions)
  const longestStreak = getLongestStreak(allDailyContributions)
  const rows = [
    convertStatisticsToRow('All Contributions', calcContributionsStatistics(allDailyContributions)),
    convertStatisticsToRow('Current Streak', currentStreak.statistics),
    convertStatisticsToRow('Longest Streak', longestStreak.statistics)
  ]
  const table = convertToTable(rows, ['Category', 'From    ~     To ', 'Sum', 'Max', 'Min', 'Median', 'Distrib'])
  console.log(table)
}

main()
  .catch(({ message }) => {
    console.error(chalk.red(message))
  })
