import { Streak } from './lib/Streak'
import { Day } from './lib/Day'

import type { StreakStrategyType } from './type'

export const getCurrentStreak: StreakStrategyType = contributions => {
  const today = Day.today()
  const todayIndex = contributions.list.findIndex(contribution => contribution.day.shallowEqual(today))

  if (todayIndex === -1) throw new Error('Contributions has no today\'s information')

  let index = todayIndex
  for (; index >= 0; index--) {
    if (contributions.list[index].count === 0) break
  }

  return new Streak(contributions.list.slice(index + 1, todayIndex + 1))
}
