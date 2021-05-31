import { monthArray, dayArray } from './../constants/date'

export const dateToText = (date: Date) => {
  const createDate = new Date(date)
  const dayOfWeek = dayArray[createDate.getDay()]
  const month = monthArray[createDate.getMonth()]
  const year = createDate.getFullYear()
  const dayOfMonth = createDate.getDate()
  return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`
}
