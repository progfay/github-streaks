import { formatDate } from './lib/formatDate'
import { dayPeriodGenerator } from './lib/dayPeriodGenerator'
import type { ContinuousContributionsType } from './type'

export const getOngoingContinuousContributions = (
  allDailyContributions: Map<string, number>
): ContinuousContributionsType => {
  const today = new Date()
  const todayContribution = allDailyContributions.get(formatDate(new Date()))

  if (!todayContribution) {
    return {
      from: null,
      to: null,
      count: 0
    }
  }

  const continuousContributions: ContinuousContributionsType = {
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    to: null,
    count: 0
  }

  for (const date of dayPeriodGenerator(today, new Date('1889-01-01'))) {
    const key = formatDate(date)
    const contribution = allDailyContributions.get(key)
    if (!contribution) return continuousContributions
    continuousContributions.to = date
    continuousContributions.count++
  }

  return continuousContributions
}
