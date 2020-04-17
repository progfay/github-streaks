
import { formatDate } from './../formatDate'

describe('formatDate(date: Date) function', () => {
  describe('takes a Date, `date` as argument', () => {
  })

  describe('return formatted date string like YYYY-MM-DD', () => {
    it('formatDate(new Date(Date.UTC(2020, 7, 1))) return "2020-08-01"', () => {
      expect(formatDate(new Date(Date.UTC(2020, 7, 1)))).toEqual('2020-08-01')
    })
  })
})
