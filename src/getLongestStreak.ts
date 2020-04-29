import { Day } from './lib/Day'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import type { StreakType, StreakStrategyType } from './type'

export const getLongestStreak = (since: Day, until: Day): StreakStrategyType =>
  (contributions) => {
    const longestStreak: StreakType = {
      from: null,
      to: null,
      count: 0
    }

    const streak: StreakType = {
      from: null,
      to: null,
      count: 0
    }

    for (const day of dayPeriodGenerator(until, since)) {
      const key = day.toString()
      if (!contributions.has(key)) break
      const contribution = contributions.get(key)

      if (contribution === 0) {
        if (streak.count > longestStreak.count) {
          longestStreak.from = streak.from
          longestStreak.to = streak.to
          longestStreak.count = streak.count
        }
        streak.from = null
        streak.to = null
        streak.count = 0
        continue
      }

      streak[streak.to ? 'from' : 'to'] = day
      streak.count++
    }

    return streak.count < longestStreak.count ? longestStreak : streak
  }
