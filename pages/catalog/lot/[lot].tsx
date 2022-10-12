import Link from 'next/link'
import CarPageCarousel from '../../../src/components/CarPageCarousel/CarPageCarousel'
// SVG
// import InfoSVG from '../../../src/assets/svg/info.svg'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import RightPolygonSVG from '../../../src/assets/svg/right-polygon.svg'
import CrashTypeSVG from '../../../src/assets/svg/crash_type.svg'
import MileageSVG from '../../../src/assets/svg/mileage.svg'
import EngineVolumeSVG from '../../../src/assets/svg/engine_volume.svg'
import FuelTypeSVG from '../../../src/assets/svg/fuel_type.svg'
import TransmissionSVG from '../../../src/assets/svg/transmission.svg'
import CalendarSVG from '../../../src/assets/svg/calendar.svg'
import HeathSVG from '../../../src/assets/svg/heath.svg'
import CarBodySVG from '../../../src/assets/svg/carbody.svg'
import DriveTypeSVG from '../../../src/assets/svg/drive_type.svg'
import SellerSVG from '../../../src/assets/svg/seller.svg'
import StarSVG from '../../../src/assets/svg/star.svg'
import KeysSVG from '../../../src/assets/svg/keys.svg'
import DocumentTypeSVG from '../../../src/assets/svg/document-type.svg'
import StateSVG from '../../../src/assets/svg/state.svg'
import ColorSVG from '../../../src/assets/svg/color.svg'
import ClockSVG from '../../../src/assets/svg/clock.svg'

// Types
import { CarPageProps } from '../../../src/Types/Types'
import Countdown from '../../../src/components/Countdown/Countdown'
import carFeatures from '../../../src/constants/carFeatures'
// import { dateToText } from '../../../src/helpers/dateToText'
// import Consultation from '../../../src/components/Consultation/Consultation'

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
  // console.log(car);
  // console.log(carFeatures);

  function matchCarsFeatures(parameter: any) {
    if (parameter) {
      parameter = parameter.toLowerCase()
    }
    const match: any = carFeatures.filter(
      (item) => item.eng.toLowerCase() === parameter
    )

    if (match.length > 0) {
      return match[0].ua
    }
    return
  }

  let localeDate
  let localeTime
  let auctionDateEnd = new Date(carResponse.auctionDate)
  if (carResponse?.auctionDate) {
    auctionDateEnd = new Date(carResponse.auctionDate)

    const optionsTime: any = { hour: 'numeric', minute: 'numeric' }
    const optionsDate: any = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }

    localeDate = auctionDateEnd.toLocaleString('ua', optionsDate)
    localeTime = auctionDateEnd.toLocaleString('ua', optionsTime)
  }
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
      localStorage.setItem('autoVin', car.lotInfo.vin)
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
                    головна <RightPolygonSVG />
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
              <p>
                {`${car.lotInfo.year} ${car.lotInfo.make} ${car.lotInfo.model}`}{' '}
                - його можна замовити з США безпечно з компанією CARSFROMWEST!
              </p>
              <p>
                Цікавить ціна? Наш менеджер зробить детальний прорахунок: ціна
                за лот, сума застави (10% від аукціонної ціни), аукціонний збір,
                сума доставки до порту Америки, до порту в Європі, доставка до
                України, митні збори, вартість послуг брокера та всі платежі з
                оформлення. Навіть комісію за платежі прораховують! Залиште ваші
                контакти у формі &quot;ПОРАХУВАТИ ВАРТІСТЬ&quot;
              </p>
              <p>З CARSFROMWEST ви точно не купите &quot;кота в мішку&quot;!</p>
              <p>
                Ми надаємо все: CAR FAX, експертну оцінку менеджерів з досвідом
                роботи 5+ років.
              </p>
              <p>
                Якщо хочете дізнатись більше подробиць про лот - натисніть
                &quot;ОТРИМАТИ КОНСУЛЬТАЦІЮ&quot;
              </p>
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
                {car.auctionDate && (
                  <>
                    <div className="car-page__timer-wrapper">
                      <div className="car-page__timer-left">
                        {car.auction === 'copart' ? (
                          <img
                            loading="lazy"
                            src="/assets/images/copart.png"
                            alt=""
                          />
                        ) : (
                          <img
                            loading="lazy"
                            src="/assets/images/iaai.png"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="car-page__timer-right">
                        <div className="car-page__time">
                          ДО СТАРТУ ТОРГІВ ЗАЛИШИЛОСЬ
                        </div>
                        <div className="car-page__timer">
                          <Countdown date={auctionDateEnd.toISOString()} />
                        </div>
                      </div>
                    </div>
                  </>
                )}

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
                    <div className="car-page__info-crash-label">
                      Основне пошкодження
                    </div>
                    <div className="car-page__info-crash-value">
                      {matchCarsFeatures(car.conditionInfo?.primaryDamage) ||
                        car.conditionInfo?.primaryDamage ||
                        'Відсутнє'}{' '}
                    </div>
                  </div>
                  <div className="car-page__info-crash-secondary">
                    <div className="car-page__info-crash-label">
                      Другорядне пошкодження
                    </div>
                    <div className="car-page__info-crash-value">
                      {matchCarsFeatures(car.conditionInfo?.secondaryDamage) ||
                        car.conditionInfo?.secondaryDamage ||
                        'Відсутнє'}
                    </div>
                  </div>
                </div>
                <div className="car-page__table car-page__info-table">
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <DocumentTypeSVG />
                      Тип документа:
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.saleInfo.saleDocument?.type) ||
                        car.saleInfo.saleDocument?.type ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <MileageSVG />
                      Пробіг:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo.odometer?.value || 0} миль
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <FuelTypeSVG />
                      Топливо:
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.specifications.fuelType) ||
                        car.specifications.fuelType ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <TransmissionSVG />
                      Трансмісія:
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.specifications.transmissionType) ||
                        car.specifications.transmissionType ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <EngineVolumeSVG />
                      Об`єм двигуна:
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.specifications.engine?.capacity) ||
                        car.specifications.engine?.capacity ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <HeathSVG />
                      Стан:
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.conditionInfo?.condition) ||
                        car.conditionInfo?.condition ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <CarBodySVG />
                      Кузов:
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.specifications?.bodyStyle?.type) ||
                        car.specifications?.bodyStyle?.type ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <DriveTypeSVG />
                      Привод:
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.specifications.drivelineType) ||
                        car.specifications.drivelineType ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <KeysSVG />
                      Наявність ключів:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.conditionInfo.keys
                        ? 'В наявності'
                        : 'Немає в наявності'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <StateSVG />
                      Штат/тип сертификата:
                    </span>
                    <span className="car-page__table-item-description">
                      {certString !== '-' ? certString : 'N/A'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <StarSVG />
                      Тип продавця
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.saleInfo?.seller?.group) ||
                        car.saleInfo?.seller?.group ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <CalendarSVG />
                      Рік:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.lotInfo.year || 'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <SellerSVG />
                      Продавець:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.saleInfo.seller?.displayName || 'Не вказаний'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <ColorSVG />
                      Колір:
                    </span>
                    <span className="car-page__table-item-description">
                      {matchCarsFeatures(car.specifications?.color) ||
                        car.specifications?.color ||
                        'Н/Д'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      <ClockSVG />
                      Початок аукціону:
                    </span>
                    <span className="car-page__table-item-description">
                      {localeTime || 'Н/Д'} {localeDate}
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

export { getCarPageProps as getServerSideProps } from '../../../src/utils/car'

export default CarPage
