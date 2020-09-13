import { Streak } from './lib/Streak'
import { Day } from './lib/Day'
import { OLDEST_DAY } from './lib/consistant'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import type { StreakStrategyType } from './type'

export const getCurrentStreak: StreakStrategyType = contributions => {
  const today = Day.today()
  const todayContribution = contributions.get(today.toString())
  if (!todayContribution) return new Streak()

  const streak = new Streak()
  streak.to = today

  for (const day of dayPeriodGenerator(today, OLDEST_DAY)) {
    const key = day.toString()
    const contribution = contributions.get(key)
    if (!contribution) return streak
    streak.from = day
    streak.count++
  }

  return streak
}
