import type { Day } from './lib/Day'

export type StreakType = {
  from: Day | null
  to: Day | null
  count: number
}
