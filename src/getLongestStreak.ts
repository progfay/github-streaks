import { Streak } from './lib/Streak'
import { StreakStrategyType } from './type'

export const getLongestStreak: StreakStrategyType = contributions => {
  let longestStartIndex = -1
  let longestEndIndex = -1
  let startIndex = -1
  let endIndex = -1

  for (let i = 0; i < contributions.length; i++) {
    if (contributions[i].count !== 0) {
      if (startIndex === -1) startIndex = i
      endIndex = i
    } else {
      if (startIndex === -1) continue
      if (longestEndIndex - longestStartIndex <= endIndex - startIndex) {
        longestStartIndex = startIndex
        longestEndIndex = endIndex
      }
      startIndex = -1
      endIndex = -1
    }
  }

  if (longestEndIndex - longestStartIndex <= endIndex - startIndex) {
    longestStartIndex = startIndex
    longestEndIndex = endIndex
  }

  if (longestStartIndex === -1) return new Streak([])
  return new Streak(contributions.slice(longestStartIndex, longestEndIndex + 1))
}
