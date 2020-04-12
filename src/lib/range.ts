export const range = (start: number, end: number): number[] => {
  const r: number[] = []
  for (let i = start; i < end; i++) {
    r.push(i)
  }
  return r
}
