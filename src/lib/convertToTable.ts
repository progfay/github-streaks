const bold = (str: string): string => `\u001b[1m${str}\u001b[22m`
const dim = (str: string): string => `\u001b[2m${str}\u001b[22m`

const CELL_DELIMITER = dim('|')

function buildCellsRow (arr: string[], decorate: (str: string, index: number) => string = str => str) {
  return CELL_DELIMITER + arr.map((elem, i) => ` ${decorate(elem, i)} `).join(CELL_DELIMITER) + CELL_DELIMITER
}

export function convertToTable<T extends { [key: string]: any }> (objects: T[], keys: (keyof T)[]) {
  const columnLength = objects.reduce(
    (lens, obj) => keys.map((key, i) => Math.max(lens[i], obj[key].toString().length)),
    keys.map(key => key.toString().length)
  )

  const rowDelimiter = dim('+' + columnLength.reduce((delimiter, len) => `${delimiter} ${'-'.repeat(len)} +`, ''))
  return rowDelimiter + '\n' + [
    buildCellsRow(keys.map(key => key.toString()), (str, i) => bold(str[i === 0 ? 'padEnd' : 'padStart'](columnLength[i]))),
    ...objects.map(obj =>
      buildCellsRow(keys.map(key => obj[key].toString()), (str, i) => str[i === 0 ? 'padEnd' : 'padStart'](columnLength[i]))
    )
  ].join(`\n${rowDelimiter}\n`) + '\n' + rowDelimiter
}
