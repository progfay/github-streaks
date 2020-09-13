import chalk from 'chalk'

import type { Contribution } from '../type'

export class Streak {
  contributions: Contribution[]
  count: number

  constructor (contributions: Contribution[]) {
    this.contributions = contributions
    this.count = 0

    for (const contribution of this.contributions) {
      const { count } = contribution
      if (count === 0) {
        this.contributions = []
        this.count = 0
        return
      }

      this.count += count
    }
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
    if (!this.from || !this.to || this.count < 0) return 'No streak...'

    return `${chalk.green(this.from.toString())} ~ ${chalk.green(this.to.toString())} (${chalk.green.bold(this.days)} ${this.days > 1 ? 'days' : 'day'})`
  }
}
