export function mergeMap<K, V> (...maps: Map<K, V>[]) {
  if (maps.length === 0) throw Error('mergeMap function must take one or more Maps as arguments.')

  const merged = new Map<K, V>()

  for (const map of maps) {
    for (const [key, value] of map) {
      merged.set(key, value)
    }
  }

  return merged
}
