import { Streak } from './lib/Streak'
import { StreakStrategyType } from './type'

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

    const shouldUpdate = longest.end - longest.start <= watching.end - watching.start
    return {
      longest: shouldUpdate ? { ...watching } : longest,
      watching
    }
  }, {
    longest: {
      start: -1,
      end: -1
    },
    watching: {
      start: -1,
      end: -1
    }
  })

  if (longest.start === -1) return new Streak([])
  return new Streak(contributions.slice(longest.start, longest.end + 1))
}
