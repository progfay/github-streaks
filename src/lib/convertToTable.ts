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
    cellDelimiter + orderedKeys.map((key, i) => ` ${(key as string)[i === 0 ? 'padEnd' : 'padStart'](columnLength[i] - 2)} `).join(cellDelimiter) + cellDelimiter + '\n' +
    rowDelimiter + '\n'

  for (const object of objects) {
    table += cellDelimiter
    for (let i = 0; i < orderedKeys.length; i++) {
      table += ` ${(object[orderedKeys[i]] as string)[i === 0 ? 'padEnd' : 'padStart'](columnLength[i] - 2)} ${cellDelimiter}`
    }
    table += '\n'
    table += rowDelimiter + '\n'
  }

  return table
}
