import { Streak } from './lib/Streak'

import type { StreakStrategyType } from './type'

export const getCurrentStreak: StreakStrategyType = contributions => {
  const date = new Date()
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const today = `${year}-${month}-${day}`
  const todayIndex = contributions.findIndex(contribution => contribution.day === today)

  if (todayIndex === -1) throw new Error('Contributions has no today\'s information')

  let index = todayIndex
  for (; index >= 0; index--) {
    if (contributions[index].count === 0) break
  }

  return new Streak(contributions.slice(index + 1, todayIndex + 1))
}
