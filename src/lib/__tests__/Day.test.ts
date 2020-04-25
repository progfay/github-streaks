import { Day } from '../Day'

describe('Day class', () => {
  describe('constructor', () => {
    describe('takes same parameters of Date constructor as arguments', () => {
      describe('arguments must be valid Date constructor\'s parameters', () => {
        it('new Day("") throw error.', () => {
          expect(() => new Day('')).toThrow('Invalid Date')
        })
      })
    })
  })

  describe('Day.today() static method', () => {
    describe('return Day, range that increments by 1 from `start` to `end - 1`', () => {
      it('Day.today() return today\'s Day object.', () => {
        const date = new Date()
        const today = Day.today()
        expect(today.getFullYear()).toEqual(date.getFullYear())
        expect(today.getMonth()).toEqual(date.getMonth())
        expect(today.getDate()).toEqual(date.getDate())
      })
    })
  })

  describe('shallowEqual(day: Day) method', () => {
    describe('takes a Day object as argument', () => {})

    describe('return whether is the same day as `day`', () => {
      it('new Day(2020, 10, 10).shallowEqual(new Day(2020, 10, 10)) return true', () => {
        const day1 = new Day(2020, 10, 10)
        const day2 = new Day(2020, 10, 10)
        expect(day1.shallowEqual(day2)).toEqual(true)
      })

      it('new Day(2020, 10, 10).shallowEqual(new Day(2020, 10, 11)) return false', () => {
        const day1 = new Day(2020, 10, 10)
        const day2 = new Day(2020, 10, 11)
        expect(day1.shallowEqual(day2)).toEqual(false)
      })
    })
  })

  describe('toString() method', () => {
    describe('return a string representing the specified Day object', () => {
      it('new Day(2020, 10, 10).toString() return "2020-11-10"', () => {
        expect(new Day(2020, 10, 10).toString()).toEqual('2020-11-10')
      })
    })
  })
})
