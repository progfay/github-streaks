import { Streak } from './lib/Streak'
import { StreakStrategyType } from './type'

interface Range {
  start: number
  end: number
}

const emptyRange = (): Range => ({ start: -1, end: -1 })

export const getLongestStreak: StreakStrategyType = contributions => {
  const { longest } = contributions.reduce(({ longest, watching }, contribution, i) => {
    if (contribution.count !== 0) {
      return {
        longest,
        watching: {
          start: watching.start === -1 ? i : watching.start,
          end: i
        }
      }
    }

    if (watching.start === -1) return { longest, watching }

    const isNewLongestFound = longest.end - longest.start <= watching.end - watching.start
    return {
      longest: isNewLongestFound ? watching : longest,
      watching: emptyRange()
    }
  }, {
    longest: emptyRange(),
    watching: emptyRange()
  })

  if (longest.start === -1) return new Streak([])
  return new Streak(contributions.slice(longest.start, longest.end + 1))
}
