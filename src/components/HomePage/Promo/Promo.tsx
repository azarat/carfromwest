import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import AutoSearch from './AutoSearch'

const Promo: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const handleFormOpen = useCallback(() => {
    setOpen((prev) => {
      const { body } = document
      if (!prev) body.classList.add('fixed')
      else body.classList.remove('fixed')
      return !prev
    })
  }, [])

  return (
    <div className="promo">
      <div className="promo__bg">
        <Image
          objectFit="cover"
          layout="fill"
          src="/assets/images/promo-bg.jpeg"
        />
      </div>
      <div className="promo__filter">
        <AutoSearch isFormOpen={open} handleFormOpen={handleFormOpen} />
      </div>
      <div className="promo__wrapper">
        <h1 className="promo__title">
          АВТО ИЗ США
          <br /> С ЭКОНОМИЕЙ ДО 40%
        </h1>
        <p className="promo__description">
          Оставьте номер телефона – мы свяжемся с вами через несколько минут,
          подробно расскажем как можно сэкономить на покупке автомобиля из США и
          подберем подходящие варианты
        </p>
        <button onClick={handleFormOpen} className="promo__button">
          НАЙТИ АВТО
        </button>
      </div>
    </div>
  )
}

export default Promo
