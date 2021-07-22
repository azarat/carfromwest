export const calcFee = (price: number): number => Math.ceil(price * 0.1)

export const calcExciseTax = (
  gasType: string,
  year: number,
  capacity: number
): number => {
  let coefficient: number

  if (gasType === 'gasoline') {
    if (capacity > 3000) {
      coefficient = 0.1
    } else {
      coefficient = 0.05
    }
  } else if (gasType === 'diesel') {
    if (capacity > 3000) {
      coefficient = 0.15
    } else {
      coefficient = 0.075
    }
  } else {
    coefficient = 0.05
  }
  const yearNow = new Date(Date.now()).getFullYear() - 1
  const carAge = yearNow - year
  const result = Math.ceil(coefficient * carAge * capacity)
  return result
}

export const calcPDV = (price: number, fee: number, exciseTax: number) =>
  Math.ceil((price + fee + exciseTax) * 0.2)

export const calcSum = (fee: number, exciseTax: number, pdv: number) =>
  fee + exciseTax + pdv

export const capacityArray = (min = 0.7, max = 17) => {
  const arr = []
  for (let i = min; i <= max + 0.1; i += 0.1)
    arr.push(`${Math.round(i * 10) / 10}`)
  return arr
}
