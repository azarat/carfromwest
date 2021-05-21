import React, { useEffect, useState } from 'react'
import CountdownBox from './CountdownBox'

type CountdownProps = {
  date: string
}

let interval: any

const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const now = new Date()
  const selectedDate = new Date(date)
  const millisecondsLeft = selectedDate.getTime() - now.getTime()
  const daysLeft = Math.floor(millisecondsLeft / (1000 * 60 * 60 * 24))
  const hoursLeft = Math.floor((millisecondsLeft / (1000 * 60 * 60)) % 24)
  const minutesLeft = Math.floor((millisecondsLeft / (1000 * 60)) % 60)
  const secondsLeft = Math.floor((millisecondsLeft / 1000) % 60)

  const daysLeftOutput = daysLeft < 10 ? `0${daysLeft}` : daysLeft
  const hoursLeftOutput = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft
  const minutesLeftOutput = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft
  const secondsLeftOutput = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft

  const [completed, setCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: daysLeft > 0 ? daysLeftOutput : '00',
    hours: hoursLeft > 0 ? hoursLeftOutput : '00',
    minutes: minutesLeft > 0 ? minutesLeftOutput : '00',
    seconds: secondsLeft > 0 ? secondsLeftOutput : '00',
  })

  useEffect(() => {
    if (completed) {
      clearInterval(interval)
    }
  }, [completed])

  useEffect(() => {
    if (!completed) {
      interval = setInterval(() => {
        if (millisecondsLeft > 0) {
          setTimeLeft({
            days: daysLeftOutput,
            hours: hoursLeftOutput,
            minutes: minutesLeftOutput,
            seconds: secondsLeftOutput,
          })
        } else {
          setTimeLeft({
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
          })
          setCompleted(true)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    selectedDate,
    now,
    completed,
    daysLeft,
    hoursLeft,
    secondsLeft,
    millisecondsLeft,
    daysLeftOutput,
    hoursLeftOutput,
    secondsLeftOutput,
  ])

  return (
    <div className="countdown">
      <CountdownBox left={timeLeft.days} label="дней" />
      <CountdownBox left={timeLeft.hours} label="часов" />
      <CountdownBox left={timeLeft.minutes} label="минут" />
      <CountdownBox left={timeLeft.seconds} label="секунд" />
    </div>
  )
}

export default Countdown
