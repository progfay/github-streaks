import { Day } from './lib/Day'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import type { ContinuousContributionsType } from './type'

export const getOngoingContinuousContributions = (
  allDailyContributions: Map<string, number>
): ContinuousContributionsType => {
  const today = Day.today()
  const todayContribution = allDailyContributions.get(Day.today().toString())

  if (!todayContribution) {
    return {
      from: null,
      to: null,
      count: 0
    }
  }

  const continuousContributions: ContinuousContributionsType = {
    from: new Day(today),
    to: null,
    count: 0
  }

  const OLDEST_DAY = new Day('1889-01-01')

  for (const day of dayPeriodGenerator(today, OLDEST_DAY)) {
    const key = day.toString()
    const contribution = allDailyContributions.get(key)
    if (!contribution) return continuousContributions
    continuousContributions.to = day
    continuousContributions.count++
  }

  return continuousContributions
}
