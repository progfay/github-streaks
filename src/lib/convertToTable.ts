const padCenter = (target: string, maxLength: number): string => (
  target
    .padStart(target.length + Math.floor((maxLength - target.length) / 2), ' ')
    .padEnd(maxLength, ' ')
)

export function convertToTable<T extends { [key: string]: any }> (objects: T[], orderedKeys: (keyof T)[]) {
  const columnLength = orderedKeys.map(key => key.toString().length + 2)

  for (let i = 0; i < orderedKeys.length; i++) {
    const key = orderedKeys[i] as string
    for (const object of objects) {
      columnLength[i] = Math.max(columnLength[i], object[key].toString().length + 2)
    }
  }

  const rowDelimiter = '+' + columnLength.reduce((accr, len) => `${accr}${'-'.repeat(len)}+`, '')
  const cellDelimiter = '|'
  let table = rowDelimiter + '\n' +
    cellDelimiter + orderedKeys.map((key, i) => padCenter(key as string, columnLength[i])).join(cellDelimiter) + cellDelimiter + '\n' +
    rowDelimiter + '\n'

  for (const object of objects) {
    table += cellDelimiter
    for (let i = 0; i < orderedKeys.length; i++) {
      table += padCenter(object[orderedKeys[i]], columnLength[i]) + cellDelimiter
    }
    table += '\n'
    table += rowDelimiter + '\n'
  }

  return table
}
