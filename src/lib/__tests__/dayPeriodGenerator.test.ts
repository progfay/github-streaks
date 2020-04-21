import { dayPeriodGenerator } from './../dayPeriodGenerator'

describe('dayPeriodGenerator(start: Date, end: Date) generator function', () => {
  describe('takes 2 Dates, `start` and `end` as arguments', () => {
    // describe('`start` and `end` must be integer', () => {
    //   it('dayPeriodGenerator(0.1, 5.5) throw error.', () => {
    //     expect(() => dayPeriodGenerator(0.1, 5.5)).toThrow('First and second arguments of `dayPeriodGenerator` function must be integer.')
    //   })
    // })
  })

  describe('return Generator object, iterate day from `start` to `end`', () => {
    it('dayPeriodGenerator(Date{1 Apr 2020}, Date{1 Apr 2020}) return Generator[Date{1 Apr 2020}].', () => {
      const generator = dayPeriodGenerator(new Date(2020, 3, 2), new Date(2020, 3, 2))
      expect(generator.next().value).toEqual(new Date(2020, 3, 2))
      expect(generator.next().done).toEqual(true)
    })

    it('dayPeriodGenerator(Date{1 Apr 2020}, Date{3 Apr 2020}) return Generator[Date{1 Apr 2020}, Date{2 Apr 2020}, Date{3 Apr 2020}].', () => {
      const generator = dayPeriodGenerator(new Date(2020, 3, 2), new Date(2020, 3, 4))
      expect(generator.next().value).toEqual(new Date(2020, 3, 2))
      expect(generator.next().value).toEqual(new Date(2020, 3, 3))
      expect(generator.next().value).toEqual(new Date(2020, 3, 4))
      expect(generator.next().done).toEqual(true)
    })
  })
})
