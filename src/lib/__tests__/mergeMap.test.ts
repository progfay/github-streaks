import { mergeMap } from './../mergeMap'

describe('mergeMap(...maps: Map[]) function', () => {
  describe('takes one or more maps as arguments', () => {
    it('mergeMap() throw error.', () => {
      expect(() => mergeMap()).toThrow('mergeMap function must take one or more Maps as arguments.')
    })
  })

  describe('return Map object that merges `maps` into one', () => {
    it('mergeMap(Map{ hoge: 0 }, Map{ fuga: 1 }) return Map{ hoge: 0, fuga: 1 }', () => {
      expect(mergeMap(new Map([['hoge', 0]]), new Map([['fuga', 1]]))).toEqual(new Map([['hoge', 0], ['fuga', 1]]))
    })

    describe('duplicated key is updated with last map\'s value', () => {
      it('mergeMap(Map{ hoge: 0 }, Map{ hoge: 1 }) return Map{ hoge: 1 }', () => {
        expect(mergeMap(new Map([['hoge', 0]]), new Map([['hoge', 1]]))).toEqual(new Map([['hoge', 1]]))
      })
    })
  })
})
