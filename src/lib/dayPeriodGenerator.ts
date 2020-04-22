import { Day } from './Day'

export function * dayPeriodGenerator (start: Day, end: Day) {
  if (start.shallowEqual(end)) return new Day(start)

  const from = new Day(start)
  const to = new Day(end)
  const step = from < to ? 1 : -1

  // eslint-disable-next-line no-unmodified-loop-condition
  while (step > 0 ? from < to : from > to) {
    yield new Day(from)
    from.setDate(from.getDate() + step)
  }
  return to
}
