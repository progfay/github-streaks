import { calcContributionsStatistics } from './calcContributionsStatistics'

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
}
