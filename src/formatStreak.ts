import chalk from 'chalk'
import type { StreakType } from './type'

export const formatStreak = (streak: StreakType): string => {
  const { from, to, count } = streak

  if (!from || !to || count < 0) return 'No streak...'

  return `${chalk.green(from.toString())} ~ ${chalk.green(to.toString())} (${chalk.green.bold(count)} ${count > 1 ? 'days' : 'day'})`
}
