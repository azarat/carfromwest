import Link from 'next/link'
import CarPageCarousel from '../../src/components/CarPageCarousel/CarPageCarousel'
// SVG
import InfoSVG from '../../src/assets/svg/info.svg'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import RightPolygonSVG from '../../src/assets/svg/right-polygon.svg'
// Types
import { CarPageProps, ILot } from '../../src/Types/Types'
import Countdown from '../../src/components/Countdown/Countdown'
import { dateToText } from '../../src/helpers/dateToText'
import SimilarCar from '../../src/components/SimilarCar/SimilarCar'
import { ICarsFetchTypes } from '../../src/components/CatalogGrid/Types'
import Consultation from '../../src/components/Consultation/Consultation'
import { IFilter } from '../../src/components/FilterFull/Types'

const CarPage: NextPage<CarPageProps> = ({ carResponse }): JSX.Element => {
  const router = useRouter()
  const [car, setCar] = useState(carResponse)
  const [similarCar, setSimilarCar] = useState<ILot[]>([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    setLoading(true)
    const defaultUrl = '/api/lots'

    const defaultFilter: Partial<IFilter> = {
      page: 1,
      itemsPerPage: 12,
      vehicleType: 'automobile',
      includeFilters: ['vehicleTypes'],
    }

    const simillarFetches = [
      fetch(defaultUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultFilter),
      }),
      fetch(defaultUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...defaultFilter,
          includeFilters: [
            ...(defaultFilter.includeFilters as string[]),
            'makes',
          ],
          makes: [car.lotInfo.make],
        }),
      }),
      fetch(defaultUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...defaultFilter,
          includeFilters: [
            ...(defaultFilter.includeFilters as string[]),
            'makes',
            'models',
          ],
          makes: [car.lotInfo.make],
          models: [car.lotInfo.model],
        }),
      }),
      fetch(defaultUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...defaultFilter,
          includeFilters: [
            ...(defaultFilter.includeFilters as string[]),
            'makes',
            'models',
          ],
          makes: [car.lotInfo.make],
          models: [car.lotInfo.model],
          yearMin: car.lotInfo.year,
          yearMax: car.lotInfo.year,
        }),
      }),
      fetch(defaultUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...defaultFilter,
          includeFilters: [
            ...(defaultFilter.includeFilters as string[]),
            'makes',
            'models',
          ],
          makes: [car.lotInfo.make],
          models: [car.lotInfo.model],
          yearMin: car.lotInfo.year - 2,
          yearMax: car.lotInfo.year + 2,
        }),
      }),
    ]
    Promise.all(simillarFetches)
      .then((response) => Promise.all(response.map((resp) => resp.json())))
      .then((data: ICarsFetchTypes[]) => {
        const [byDefault, byMark, byModel, byYear, byYearAnother] = data.map(
          (d) => {
            const filtred =
              d.items?.filter((c) => c.lotNumber !== car.lotNumber) || []
            return {
              totalItems: filtred.length,
              data: filtred,
            }
          }
        )

        if (byYear.totalItems !== 0) setSimilarCar(byYear.data)
        else if (byYearAnother.totalItems !== 0)
          setSimilarCar(byYearAnother.data)
        else if (byModel.totalItems !== 0) setSimilarCar(byModel.data)
        else if (byMark.totalItems !== 0) setSimilarCar(byMark.data)
        else if (byDefault.totalItems !== 0) setSimilarCar(byDefault.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [car])

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
                      {car.saleInfo.seller.displayName}
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
                        ? 'Заводится'
                        : 'Не заводится'}
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
        <SimilarCar data={similarCar} loading={loading} />
        <Consultation />
      </section>
    </div>
  )
}

export { getCarPageProps as getServerSideProps } from '../../src/utils/car'

export default CarPage
