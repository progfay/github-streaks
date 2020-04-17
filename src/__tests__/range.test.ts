import { range } from './../range'

describe('range(start: number, end: number) function', () => {
  describe('takes 2 numbers, `start` and `end` as arguments', () => {
    describe('`start` and `end` must be integer', () => {
      it('range(0.1, 5.5) throw error.', () => {
        expect(() => range(0.1, 5.5)).toThrow('First and second arguments of `range` function must be integer.')
      })
    })

    describe('`start` must be lower than `end`', () => {
      it('range(3, 3) throw error.', () => {
        expect(() => range(3, 3)).toThrow('First argument of `range` function must be lower than second argument.')
      })

      it('range(8, 3) throw error.', () => {
        expect(() => range(8, 3)).toThrow('First argument of `range` function must be lower than second argument.')
      })
    })
  })

  describe('return number array, range that increments by 1 from `start` to `end - 1`', () => {
    it('range(3, 8) return [3, 4, 5, 6, 7].', () => {
      expect(range(3, 8)).toEqual([3, 4, 5, 6, 7])
    })
  })
})
