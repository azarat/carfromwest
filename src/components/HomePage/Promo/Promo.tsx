import React, { useState } from 'react'
import Image from 'next/image'
import AutoSearch from './AutoSearch'
import ArrowLinkSVG from '../../../assets/svg/right-arrow-link.svg'
import { useRouter } from 'next/router'

const Promo: React.FC = (): JSX.Element => {
  const [open] = useState(false)
  const router = useRouter()


  const handleFormOpen = (): void => {
    router.push('/selection')
  }

  return (
    <>
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
            подробно расскажем как можно сэкономить на покупке автомобиля из США
            и подберем подходящие варианты
          </p>
          <div
            role="presentation"
            className="promo__video"
          >
            {/* <div className="promo__video-image">
              <span className="promo__video-play-button" />
            </div> */}
            <div className="promo__video-link">
              <ArrowLinkSVG />
              <button onClick={handleFormOpen} className="promo__button">
                Подобрать авто
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Promo
