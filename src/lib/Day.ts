type DateConstructorParameters =
  | [Date]
  | [string]
  | [number?, number?, number?, number?, number?, number?, number?]

export class Day extends Date {
  constructor (...args: DateConstructorParameters) {
    // @ts-ignore
    const date = new Date(...args)
    if (isNaN(date.getTime())) throw new Error('Invalid Date')
    super(date.getFullYear(), date.getMonth(), date.getDate())
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
