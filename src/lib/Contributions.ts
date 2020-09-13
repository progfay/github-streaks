import { Day } from './Day'
import { Streak } from './Streak'

import type { Contribution } from '../type'

export class Contributions {
  list: Contribution[] = []

  constructor (contributions: Contribution[]) {
    this.list = contributions
  }

  static merge (...contributionsList: Contributions[]): Contributions {
    return new Contributions(contributionsList.flatMap(contributions => contributions.list))
  }

  getStreak (from: Day, to: Day): Streak {
    const fromIndex = this.list.findIndex(contribution => from.shallowEqual(contribution.day))
    const toIndex = this.list.findIndex(contribution => to.shallowEqual(contribution.day))

    if (fromIndex === -1 || toIndex === -1) {
      throw new Error('Invalid Streak range')
    }

    return new Streak(this.list.splice(fromIndex, toIndex + 1))
  }
}
