import React, { useEffect, useState } from 'react'

const delivery = {
  first:
    'Определяемся с клиентом по критериям подбора авто: год, марка, бюджет и начинаем поиск идеального варианта. Мы проверяем историю выбранного вами автомобиля, количество предыдущих владельцев, пробег, были ли ДТП и множество других критериев. С нами вы застрахованы от приобретения «утопленника» или аналогичного «кота в мешке».',
  second:
    'Наши эксперты участвуют вторгах, покупая ваш будущий автомобиль за указанный бюджет. Выкупленные машины доставляются в Украину в самые сжатые сроки, причем вы всегдаможете отследить местонахождение своего приобретения по спецкоду.',
  third:
    'Представители компании встречают ваш автомобиль	в порту, организовывают экспедиторские услуги, выгружают транспорт изконтейнера и проводят все необходимые таможенные процедуры.',
  fourth:
    'При необходимости мы поможем подобрать оригинальные запчасти на ваш автомобиль, качественно отремонтировав и отрегулировав его. Сертификация автомобиля в Украине и постановка на учет займет минимум времени, после чего вы становитесь полноценным владельцем современного и удобного транспорта!',
  fifth: 'Поздравляем! Вы стали владельцем отличного авто!',
}

const MainPageTimeLine: React.FC = () => {
  const [stepPoint, setStepPoint] = useState<number>(0)

  const handleChangePoint = (number: number) => {
    setStepPoint(number)
  }

  const movingSteps = () => {
    return setInterval(() => {
      if (stepPoint < 100) {
        setStepPoint((prev) => prev + 1)
      } else {
        setTimeout(() => {
          setStepPoint(() => 0)
        }, 3000)
      }
    }, 1000)
  }

  useEffect(() => {
    const interval = movingSteps()
    return () => clearInterval(interval)
  }, [stepPoint])

  return (
    <section id="delivery-section" className="delivery-process">
      <div className="delivery-process__container">
        <h4 className="delivery-process__title">
          Процесс доставки авто из США
        </h4>
        <div className="delivery-process__line-box">
          <div
            role="presentation"
            className={`${
              stepPoint >= 0
                ? 'dots first dots--active'
                : 'dots first dots--disabled'
            }`}
            onClick={() => handleChangePoint(0)}
          />
          <div
            role="presentation"
            className={`${
              stepPoint >= 25
                ? 'dots second dots--active'
                : 'dots second dots--disabled'
            }`}
            onClick={() => handleChangePoint(25)}
          />
          <div
            role="presentation"
            className={`${
              stepPoint >= 50
                ? 'dots third dots--active'
                : 'dots third dots--disabled'
            }`}
            onClick={() => handleChangePoint(50)}
          />
          <div
            role="presentation"
            className={`${
              stepPoint >= 75
                ? 'dots fourth dots--active'
                : 'dots fourth dots--disabled'
            }`}
            onClick={() => handleChangePoint(75)}
          />
          <div
            role="presentation"
            className={`${
              stepPoint === 100
                ? 'dots fifth dots--active'
                : 'dots fifth dots--disabled'
            }`}
            onClick={() => handleChangePoint(100)}
          />
          <div className="line-bg" />
          <div
            style={{ width: `${stepPoint}%` }}
            className={`${stepPoint === 0 ? 'start' : ''} line ${
              stepPoint === 100 ? 'full' : ''
            }`}
          />
        </div>
        <div className="delivery-process__info">
          {stepPoint >= 0 && stepPoint < 25 && <p>{delivery.first}</p>}
          {stepPoint >= 25 && stepPoint < 50 && <p>{delivery.second}</p>}
          {stepPoint >= 50 && stepPoint < 75 && <p>{delivery.third}</p>}
          {stepPoint >= 75 && stepPoint < 100 && <p>{delivery.fourth}</p>}
          {stepPoint === 100 && <p>{delivery.fifth}</p>}
        </div>
      </div>
    </section>
  )
}

export default MainPageTimeLine
