import { Contribution, Statistics } from './type'

export const calcContributionsStatistics = (contributions: Contribution[]): Statistics => {
  const statistics: Statistics = {
    from: '',
    to: '',
    days: 0,
    sum: 0,
    max: 0,
    min: 0,
    median: 0,
    distribution: 0
  }
  if (contributions.length === 0) return statistics

  statistics.from = contributions[0].day
  statistics.to = contributions[contributions.length - 1].day
  statistics.days = contributions.length
  statistics.max = contributions[0].count
  statistics.min = contributions[0].count
  let sumOfSquare = 0

  for (const contribution of contributions) {
    const { count } = contribution
    statistics.sum += count
    sumOfSquare += count ** 2
  }

  statistics.median = statistics.sum / statistics.days
  statistics.distribution = sumOfSquare - statistics.median ** 2
  return statistics
}