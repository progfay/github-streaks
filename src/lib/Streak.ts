import chalk from 'chalk'
import { calcContributionsStatistics } from '../calcContributionsStatistics'

import type { Contribution, Statistics } from '../type'

export class Streak {
  contributions: Contribution[]
  statistics: Statistics

  constructor (contributions: Contribution[]) {
    this.contributions = contributions

    if (contributions.some(contribution => contribution.count === 0)) {
      this.statistics = {
        from: '',
        to: '',
        days: 0,
        sum: 0,
        max: 0,
        min: 0,
        median: 0,
        distribution: 0
      }
      return
    }

    this.statistics = calcContributionsStatistics(contributions)
  }

  toString (): string {
    if (!this.statistics.from || !this.statistics.to || this.statistics.sum < 0) return 'No streak...'

    return `${chalk.green(this.statistics.from)} ~ ${chalk.green(this.statistics.to)} (${chalk.green.bold(this.statistics.days)} ${this.statistics.days > 1 ? 'days' : 'day'})`
  }
}
