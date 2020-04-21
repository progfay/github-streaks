export function * dayPeriodGenerator (start: Date, end: Date) {
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  ) {
    return new Date(start.getFullYear(), start.getMonth(), start.getDate())
  }

  const from = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const to = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  const step = from < to ? 1 : -1

  // eslint-disable-next-line no-unmodified-loop-condition
  while (step > 0 ? from < to : from > to) {
    yield new Date(from)
    from.setDate(from.getDate() + step)
  }
  return to
}
