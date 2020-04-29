import type { StreakStrategyType } from './type'

export const showStreak = (contributions: Map<string, number>, streakStrategy: StreakStrategyType): void => {
  const { from, to, count } = streakStrategy(contributions)
  if (from && to && count > 0) {
    console.log(`${from.toString()} ~ ${to.toString()} (${count} ${count === 1 ? 'days' : 'day'})`)
  } else {
    console.log('No streak...')
  }
}
