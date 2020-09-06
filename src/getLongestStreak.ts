import { Streak } from './lib/Streak'
import { Day } from './lib/Day'
import { OLDEST_DAY } from './lib/consistant'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import { StreakStrategyType } from './type'

export const getLongestStreak: StreakStrategyType = contributions => {
  let longestStreak: Streak = new Streak()
  let streak: Streak = new Streak()

  const today = Day.today()
  for (const day of dayPeriodGenerator(today, OLDEST_DAY)) {
    const key = day.toString()
    const contribution = contributions.get(key)
    if (!contribution) break

    if (contribution === 0) {
      if (streak.count > longestStreak.count) longestStreak = { ...streak }
      streak = new Streak()
      continue
    }

    if (!streak.to) streak.to = day
    streak.from = day
    streak.count++
  }

  return streak.count < longestStreak.count ? longestStreak : streak
}
