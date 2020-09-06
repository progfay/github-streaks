import { StreakType } from '../type'
import { Day } from './Day'

export const OLDEST_DAY = new Day('1889-01-01')

export const INITIAL_STREAK: StreakType = {
  from: null,
  to: null,
  count: 0
}
