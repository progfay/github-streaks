import { dayPeriodGenerator } from './../dayPeriodGenerator'
import { Day } from './../Day'

describe('dayPeriodGenerator(start: Day, end: Day) generator function', () => {
  describe('takes 2 Day Objects, `start` and `end` as arguments', () => {
  })

  describe('return Generator object, iterate day from `start` to `end`', () => {
    it('dayPeriodGenerator(Day{1 Apr 2020}, Day{1 Apr 2020}) return Generator[Day{1 Apr 2020}].', () => {
      const generator = dayPeriodGenerator(new Day(2020, 3, 2), new Day(2020, 3, 2))
      expect(generator.next().value).toEqual(new Day(2020, 3, 2))
      expect(generator.next().done).toEqual(true)
    })

    it('dayPeriodGenerator(Day{1 Apr 2020}, Day{3 Apr 2020}) return Generator[Day{1 Apr 2020}, Day{2 Apr 2020}, Day{3 Apr 2020}].', () => {
      const generator = dayPeriodGenerator(new Day(2020, 3, 2), new Day(2020, 3, 4))
      expect(generator.next().value).toEqual(new Day(2020, 3, 2))
      expect(generator.next().value).toEqual(new Day(2020, 3, 3))
      expect(generator.next().value).toEqual(new Day(2020, 3, 4))
      expect(generator.next().done).toEqual(true)
    })
  })
})
