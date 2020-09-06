import { Day } from './lib/Day'
import { INITIAL_STREAK, OLDEST_DAY } from './lib/consistant'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import type { StreakType, StreakStrategyType } from './type'

export const getLongestStreak: StreakStrategyType = contributions => {
  let longestStreak: StreakType = { ...INITIAL_STREAK }
  let streak: StreakType = { ...INITIAL_STREAK }

  const today = Day.today()
  for (const day of dayPeriodGenerator(today, OLDEST_DAY)) {
    const key = day.toString()
    const contribution = contributions.get(key)
    if (!contribution) break

    if (contribution === 0) {
      if (streak.count > longestStreak.count) longestStreak = { ...streak }
      streak = { ...INITIAL_STREAK }
      continue
    }

    if (!streak.to) streak.to = day
    streak.from = day
    streak.count++
  }

  return streak.count < longestStreak.count ? longestStreak : streak
}
