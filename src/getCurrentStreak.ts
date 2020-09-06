import { Day } from './lib/Day'
import { INITIAL_STREAK, OLDEST_DAY } from './lib/consistant'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import type { StreakType, StreakStrategyType } from './type'

export const getCurrentStreak: StreakStrategyType = contributions => {
  const today = Day.today()
  const todayContribution = contributions.get(today.toString())
  if (!todayContribution) return { ...INITIAL_STREAK }

  const streak: StreakType = { ...INITIAL_STREAK, to: today }

  for (const day of dayPeriodGenerator(today, OLDEST_DAY)) {
    const key = day.toString()
    const contribution = contributions.get(key)
    if (!contribution) return streak
    streak.from = day
    streak.count++
  }

  return streak
}
