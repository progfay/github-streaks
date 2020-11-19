import { Contribution, Statistics } from '../type'

const createZeroStatistics = (): Statistics => ({
  from: '',
  to: '',
  days: 0,
  sum: 0,
  max: 0,
  min: 0,
  mean: 0,
  stddev: 0
})

export const calcContributionsStatistics = (contributions: Contribution[]): Statistics => {
  if (contributions.length === 0) return createZeroStatistics()

  const { sumOfSquare, ...stat } = contributions.reduce((stat, { count }) => ({
    sum: stat.sum + count,
    max: Math.max(stat.max, count),
    min: Math.min(stat.min, count),
    sumOfSquare: stat.sumOfSquare + count ** 2
  }), {
    sum: 0,
    max: contributions[0].count,
    min: contributions[0].count,
    sumOfSquare: 0
  })

  return {
    ...stat,
    from: contributions[0].day,
    to: contributions[contributions.length - 1].day,
    days: contributions.length,
    mean: stat.sum / contributions.length,
    stddev: Math.sqrt((sumOfSquare / contributions.length) - (stat.sum / contributions.length) ** 2)
  }
}
