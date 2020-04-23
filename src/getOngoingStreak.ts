import { Day } from './lib/Day'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import type { StreakType } from './type'

export const getOngoingStreak = (
  allDailyContributions: Map<string, number>
): StreakType => {
  const today = Day.today()
  const todayContribution = allDailyContributions.get(Day.today().toString())

  if (!todayContribution) {
    return {
      from: null,
      to: null,
      count: 0
    }
  }

  const streak: StreakType = {
    from: new Day(today),
    to: null,
    count: 0
  }

  const OLDEST_DAY = new Day('1889-01-01')

  for (const day of dayPeriodGenerator(today, OLDEST_DAY)) {
    const key = day.toString()
    const contribution = allDailyContributions.get(key)
    if (!contribution) return streak
    streak.to = day
    streak.count++
  }

  return streak
}
