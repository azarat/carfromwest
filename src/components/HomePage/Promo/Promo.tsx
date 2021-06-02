import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import AutoSearch from './AutoSearch'
import ArrowLinkSVG from '../../../assets/svg/right-arrow-link.svg'
import PromoModal from './PromoModal'

const Promo: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const handleFormOpen = useCallback(() => {
    setOpen((prev) => {
      const { body } = document
      if (!prev) body.classList.add('fixed')
      else body.classList.remove('fixed')
      return !prev
    })
  }, [])

  const handleModalOpen = () => {
    document.body.classList.toggle('fixed')
    setShowModal((prev) => !prev)
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
          <button onClick={handleFormOpen} className="promo__button">
            НАЙТИ АВТО
          </button>
          <div
            role="presentation"
            onClick={handleModalOpen}
            className="promo__video"
          >
            <div className="promo__video-image">
              <span className="promo__video-play-button" />
            </div>
            <div className="promo__video-link">
              <ArrowLinkSVG />
              Посмотрите видео
            </div>
          </div>
        </div>
      </div>
      {showModal ? <PromoModal close={handleModalOpen} /> : null}
    </>
  )
}

export default Promo
