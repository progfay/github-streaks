import chalk from 'chalk'
import { Day } from './Day'

export class Streak {
  from: Day | null = null
  to: Day | null = null
  count: number = 0

  toString (): string {
    if (!this.from || !this.to || this.count < 0) return 'No streak...'

    return `${chalk.green(this.from.toString())} ~ ${chalk.green(this.to.toString())} (${chalk.green.bold(this.count)} ${this.count > 1 ? 'days' : 'day'})`
  }
}
