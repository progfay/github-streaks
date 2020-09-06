import { Day } from './lib/Day'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import type { StreakType, StreakStrategyType } from './type'

export const getCurrentStreak: StreakStrategyType = contributions => {
  const today = Day.today()
  const todayContribution = contributions.get(Day.today().toString())

  if (!todayContribution) {
    return {
      from: null,
      to: null,
      count: 0
    }
  }

  const streak: StreakType = {
    from: null,
    to: new Day(today),
    count: 0
  }

  const OLDEST_DAY = new Day('1889-01-01')

  for (const day of dayPeriodGenerator(today, OLDEST_DAY)) {
    const key = day.toString()
    const contribution = contributions.get(key)
    if (!contribution) return streak
    streak.from = day
    streak.count++
  }

  return streak
}
