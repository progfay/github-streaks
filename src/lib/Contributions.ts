import type { Contribution } from '../type'

export class Contributions {
  list: Contribution[] = []

  constructor (contributions: Contribution[]) {
    this.list = contributions
  }

  static merge (...contributionsList: Contributions[]): Contributions {
    return new Contributions(contributionsList.flatMap(contributions => contributions.list))
  }
}
