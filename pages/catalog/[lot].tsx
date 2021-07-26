import Link from 'next/link'
import CarPageCarousel from '../../src/components/CarPageCarousel/CarPageCarousel'
// SVG
import InfoSVG from '../../src/assets/svg/info.svg'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import RightPolygonSVG from '../../src/assets/svg/right-polygon.svg'
// Types
import { CarPageProps } from '../../src/Types/Types'
import Countdown from '../../src/components/Countdown/Countdown'
import { dateToText } from '../../src/helpers/dateToText'
import Consultation from '../../src/components/Consultation/Consultation'

const CarPage: NextPage<CarPageProps> = ({ carResponse }): JSX.Element => {
  const router = useRouter()
  const [car, setCar] = useState(carResponse)
  const images = useMemo(
    () =>
      car.images
        ? car.images.map(({ full }) => full)
        : ['/assets/images/no-image.jpg'],
    [car]
  )

  const auctionDateEnd = new Date(carResponse.auctionDate)

  useEffect(() => {
    setCar(carResponse)
  }, [carResponse])

  const certString = car.saleInfo
    ? `${car.saleInfo.saleDocument?.state || ''}-${
        car.saleInfo.saleDocument?.type || ''
      }`
    : ''

  const handleCost = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('url', window.location.href)
      router.push({ pathname: '/order' })
    }
  }

  return (
    <div className="car-page__wrapper">
      <section className="car-page">
        <div className="container">
          <nav className="car-page__breadcrumbs">
            <ul>
              <li className="car-page__breadcrumbs-link">
                <Link href="/">
                  <a>
                    главная <RightPolygonSVG />
                  </a>
                </Link>
              </li>
              <li className="car-page__breadcrumbs-link">
                <Link href="/catalog">
                  <a>
                    каталог авто <RightPolygonSVG />
                  </a>
                </Link>
              </li>
              <li className="car-page__breadcrumbs-link">{car.lotInfo.vin}</li>
            </ul>
          </nav>
        </div>
        <div className="container">
          <div className="car-page__name-wrapper">
            <h2 className="car-page__header-title">
              {`${car.lotInfo.year} ${car.lotInfo.make} ${car.lotInfo.model}`}
            </h2>
            <div className="car-page__name-inner">
              <h2 className="car-page__title">№ Лота {car.lotNumber}</h2>
              <h2 className="car-page__auction">Аукцион: {car.auction}</h2>
            </div>
          </div>
          <div className="car-page__info-wrapper">
            <div className="car-page__header">
              <div className="car-page__header-slider">
                <CarPageCarousel images={images} />
              </div>
            </div>
            {car.auctionDate && (
              <>
                <div className="car-page__timer-wrapper">
                  <div className="car-page__time">
                    до старта торгов осталось:
                  </div>
                  <div className="car-page__timer">
                    <Countdown date={auctionDateEnd.toISOString()} />
                  </div>
                </div>
              </>
            )}
            <div className="car-page__price-wrapper">
              <div className="car-page__price">
                <p>текущая ставка</p>
                <span>${car.saleInfo.currentBid.value}</span>
              </div>
              <div className="car-page__btn">
                <button
                  className="car-page__button car-page__button-order"
                  onClick={handleCost}
                >
                  посчитать стоимость
                </button>
              </div>
            </div>
            <div className="car-page__about">
              <div className="car-page__info">
                <h2 className="car-page__subtitle car-page__info-subtitle">
                  <InfoSVG /> информация про авто
                </h2>
                <div className="car-page__table car-page__info-table">
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">VIN:</span>
                    <span className="car-page__table-item-description">
                      {car.lotInfo.vin}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      тип документа:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.saleInfo.saleDocument?.type || ''}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">Пробег:</span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo.odometer?.value || 0} миль
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">Топливо:</span>
                    <span className="car-page__table-item-description">
                      {car.specifications.fuelType}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">Привод:</span>
                    <span className="car-page__table-item-description">
                      {car.specifications.drivelineType}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Объём двигателя:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.specifications.engine?.capacity || ''}
                    </span>
                  </div>
                  {/* <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Трансмиссия:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.specifications.
}
                    </span>
                  </div> */}
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Количество цилиндров:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.specifications.engine.cylinders || ''}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Наличие ключей:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo.keys ? 'В наличии' : 'Нету в наличии'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Штат/тип сертификата:
                    </span>
                    <span className="car-page__table-item-description">
                      {certString !== '-' ? certString : 'N/A'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">Год:</span>
                    <span className="car-page__table-item-description">
                      {car.lotInfo.year}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      продавец:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.saleInfo.seller?.displayName || 'Не указан'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="car-page__repair">
                <h2 className="car-page__subtitle car-page__repair-subtitle">
                  <InfoSVG /> повреждения
                </h2>
                <div className="car-page__table car-page__repair-table">
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">Статус:</span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo.condition === 'wont-start'
                        ? 'Не заводится'
                        : 'Заводится'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Основные повреждения:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo?.primaryDamage || 'Отсутствуют'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      второстепенные повреждения:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo?.secondaryDamage || 'Отсутствуют'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="car-page__bet">
                <h2 className="car-page__subtitle car-page__bet-subtitle">
                  <InfoSVG /> Информация о ставках
                </h2>
                <div className="car-page__table car-page__bet-table">
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Дата продажи:
                    </span>
                    <span className="car-page__table-item-description">
                      {carResponse.auctionDate
                        ? dateToText(auctionDateEnd)
                        : 'Не назначена'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Время начала аукциона:
                    </span>
                    <span className="car-page__table-item-description">
                      {carResponse.auctionDate
                        ? `${auctionDateEnd.getHours()}:${auctionDateEnd.getMinutes()}`
                        : 'Не назначена'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Consultation />
      </section>
    </div>
  )
}

export { getCarPageProps as getServerSideProps } from '../../src/utils/car'

export default CarPage
