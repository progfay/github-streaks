import chalk from 'chalk'
import { calcContributionsStatistics } from '../calcContributionsStatistics'

import type { Contribution } from '../type'

export class Streak {
  contributions: Contribution[]
  sum: number = 0
  max: number = 0
  min: number = 0
  median: number = 0
  distribution: number = 0

  constructor (contributions: Contribution[]) {
    this.contributions = contributions

    if (contributions.length === 0) return
    if (contributions.some(contribution => contribution.count === 0)) return

    const { sum, max, min, median, distribution } = calcContributionsStatistics(contributions)
    this.sum = sum
    this.max = max
    this.min = min
    this.median = median
    this.distribution = distribution
  }

  get from () {
    return this.contributions[0]?.day
  }

  get to () {
    return this.contributions[this.contributions.length - 1]?.day
  }

  get days () {
    return this.contributions.length
  }

  toString (): string {
    if (!this.from || !this.to || this.sum < 0) return 'No streak...'

    return `${chalk.green(this.from.toString())} ~ ${chalk.green(this.to.toString())} (${chalk.green.bold(this.days)} ${this.days > 1 ? 'days' : 'day'})`
  }
}
