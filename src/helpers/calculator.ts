export const capacityArray = (min = 0.7, max = 17) => {
  const arr = []
  for (let i = min; i <= max; i += 0.1) arr.push(`${Math.round(i * 10) / 10}`)
  return arr
}
