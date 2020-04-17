export const range = (start: number, end: number): number[] => {
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new Error('First and second arguments of `range` function must be integer.')
  }

  if (start >= end) {
    throw new Error('First argument of `range` function must be lower than second argument.')
  }

  const r: number[] = []
  for (let i = start; i < end; i++) {
    r.push(i)
  }
  return r
}
