export class Day extends Date {
  constructor (date?: Date) {
    const _date = date || new Date()
    super(_date.getFullYear(), _date.getMonth(), _date.getDate())
  }

  static today () {
    return new Day(new Date())
  }

  shallowEqual (day: Day) {
    return this.getFullYear() === day.getFullYear() &&
    this.getMonth() === day.getMonth() &&
    this.getDate() === day.getDate()
  }

  toString () {
    const year = this.getFullYear().toString()
    const month = (this.getMonth() + 1).toString().padStart(2, '0')
    const day = this.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
