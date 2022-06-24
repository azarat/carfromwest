import Link from 'next/link'
import CarPageCarousel from '../../src/components/CarPageCarousel/CarPageCarousel'
// SVG
import InfoSVG from '../../src/assets/svg/info.svg'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import RightPolygonSVG from '../../src/assets/svg/right-polygon.svg'
import CrashTypeSVG from '../../src/assets/svg/crash_type.svg'
import MileageSVG from '../../src/assets/svg/mileage.svg'
import EngineVolumeSVG from '../../src/assets/svg/engine_volume.svg'
import FuelTypeSVG from '../../src/assets/svg/fuel_type.svg'
import TransmissionSVG from '../../src/assets/svg/transmission.svg'
import CalendarSVG from '../../src/assets/svg/calendar.svg'
import HeathSVG from '../../src/assets/svg/heath.svg'
import CarBodySVG from '../../src/assets/svg/carbody.svg'
import DriveTypeSVG from '../../src/assets/svg/drive_type.svg'
import SellerSVG from '../../src/assets/svg/seller.svg'
import StarSVG from '../../src/assets/svg/star.svg'
import KeysSVG from '../../src/assets/svg/keys.svg'
import DocumentTypeSVG from '../../src/assets/svg/document-type.svg'
import StateSVG from '../../src/assets/svg/state.svg'
import ColorSVG from '../../src/assets/svg/color.svg'
import ClockSVG from '../../src/assets/svg/clock.svg'




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
          <div className="car-page__info-wrapper">
            <div className="car-page__left">
              <div className="car-page__header">
                <div className="car-page__header-slider">
                  <CarPageCarousel images={images} />
                </div>
              </div>
            </div>
              <div className="car-page__description">
                <div className="car-page__description-label">Опис</div>
                <p>Автомобіль має привабливий колір кузова Золото, який добре проглядається на трасі в будь-який час доби.</p>
                <p>Зазначена ціна лота може варіюватися в залежності від кількості пропозицій покупців.</p>
                <p>Попередня дата продажу автомобіля призначається продавцем. Визначити участь в аваріях і підтвердити справжній пробіг авто 155 358 км км можна за даними бази Карфакс , після введення VIN коду.</p>
                <p>Кінцеву ціну лота кожен клієнт може розрахувати за допомогою онлайн-калькулятора на сайті компанії.</p>
                <p>Щоб отримати детальну інформацію по лоту, його ціною і особливості автомобіля, надішліть запит через форму . Менеджер відповість на всі питання і допоможе оформити замовлення.</p>
              </div>

            <div className="car-page__about">
              <div className="car-page__price-wrapper">
                <div className="car-page__name-wrapper">
                  <div className="car-page__name-inner">
                    <h2 className="car-page__title">#{car.lotNumber}</h2>
                  </div>
                  <h2 className="car-page__header-title">
                    {`${car.lotInfo.year} ${car.lotInfo.make} ${car.lotInfo.model}`}
                  </h2>
                </div>
                {/* <div className="car-page__price">
                  <p>текущая ставка</p>
                  <span>${car.saleInfo.currentBid.value}</span>
                </div> */}
                  <>
                    <div className="car-page__timer-wrapper">
                      <div className="car-page__timer-left">
                        <img loading="lazy" src="/assets/images/copart.png" alt="" />
                      </div>
                      <div className="car-page__timer-right">
                        <div className="car-page__time">
                          ДО СТАРТУ ТОРГІВ ЗАЛИШИЛОСЬ
                        </div>
                        <div className="car-page__timer">
                          <Countdown date={`11:12:22 20.02.2023`} />
                        </div>
                      </div>
                    </div>
                  </>

                <div className="car-page__btn">
                  <button
                    className="car-page__button car-page__button-order"
                    onClick={handleCost}
                  >
                    Порахувати вартість
                  </button>
                  <button
                    className="car-page__button car-page__button-consult"
                    onClick={handleCost}
                  >
                    Отримати консультацію
                  </button>
                </div>
              </div>
              <div className="car-page__info">
                <div className="car-page__info-crash">
                  <CrashTypeSVG />
                  <div className="car-page__info-crash-primary">
                    <div className="car-page__info-crash-label">Основне пошкодження</div>
                    <div className="car-page__info-crash-value">Передній удар</div>
                  </div>
                  <div className="car-page__info-crash-secondary">
                    <div className="car-page__info-crash-label">Другорядне пошкодження</div>
                    <div className="car-page__info-crash-value">Боковой удар</div>
                  </div>
                </div>
                <div className="car-page__table car-page__info-table">
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><DocumentTypeSVG />тип документа:</span>
                    <span className="car-page__table-item-description">
                      {car.saleInfo.saleDocument?.type || ''}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><MileageSVG />Пробег:</span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo.odometer?.value || 0} миль
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><FuelTypeSVG />Топливо:</span>
                    <span className="car-page__table-item-description">
                      {car.specifications.fuelType}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><TransmissionSVG />Трансмиссия:</span>
                    <span className="car-page__table-item-description">
                      {car.specifications.transmissionType}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><EngineVolumeSVG />Объём двигателя:</span>
                    <span className="car-page__table-item-description">
                      {car.specifications.engine?.capacity || ''}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><HeathSVG />Стан:</span>
                    <span className="car-page__table-item-description">
                      Заводится
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><CarBodySVG />Кузов:</span>
                    <span className="car-page__table-item-description">
                      Седан
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><DriveTypeSVG />Привод:</span>
                    <span className="car-page__table-item-description">
                      {car.specifications.drivelineType}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><KeysSVG />Наличие ключей:</span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo.keys ? 'В наличии' : 'Нету в наличии'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><StateSVG />Штат/тип сертификата:</span>
                    <span className="car-page__table-item-description">
                      {certString !== '-' ? certString : 'N/A'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><StarSVG />Тип продавця</span>
                    <span className="car-page__table-item-description">
                      Cтрахова компанія
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><CalendarSVG />Год:</span>
                    <span className="car-page__table-item-description">
                      {car.lotInfo.year}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><SellerSVG />продавец:</span>
                    <span className="car-page__table-item-description">
                      {car.saleInfo.seller?.displayName || 'Не указан'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><ColorSVG />Колір:</span>
                    <span className="car-page__table-item-description">
                      Білий
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title"><ClockSVG />Початок аукціону:</span>
                    <span className="car-page__table-item-description">
                      20:00 16.02.2022
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Consultation /> */}
      </section>
    </div>
  )
}

export { getCarPageProps as getServerSideProps } from '../../src/utils/car'

export default CarPage
