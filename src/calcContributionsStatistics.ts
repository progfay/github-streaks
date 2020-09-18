import { Contribution, Statistics } from './type'

export const calcContributionsStatistics = (contributions: Contribution[]): Statistics => {
  const statistics: Statistics = {
    sum: 0,
    max: 0,
    min: 0,
    median: 0,
    distribution: 0
  }
  if (contributions.length === 0) return statistics
  statistics.max = contributions[0].count
  statistics.min = contributions[0].count
  let sumOfSquare = 0

  for (const contribution of contributions) {
    const { count } = contribution
    statistics.sum += count
    sumOfSquare += count ** 2
  }

  statistics.median = statistics.sum / contributions.length
  statistics.distribution = sumOfSquare - statistics.median ** 2
  return statistics
}
