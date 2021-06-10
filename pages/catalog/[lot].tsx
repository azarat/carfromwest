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
import SimilarCar from '../../src/components/SimilarCar/SimilarCar'
import { driveLineTypes, gas, transmissions } from '../../src/constants/filter'
import { ICarsFetchTypes, ICar } from '../../src/components/CatalogGrid/Types'
import Consultation from '../../src/components/Consultation/Consultation'

const CarPage: NextPage<CarPageProps> = ({ carResponse }): JSX.Element => {
  const router = useRouter()
  const [car, setCar] = useState(carResponse)
  const [similarCar, setSimilarCar] = useState<ICar[]>([])
  const [loading, setLoading] = useState(true)
  const images = useMemo(
    () =>
      car.data.attributes.lotData.images
        ? car.data.attributes.lotData.images.map(({ i }) => i)
        : ['/assets/images/no-image.jpg'],
    [car]
  )

  const auctionDateEnd = new Date(carResponse.data.attributes.auctionDate)

  useEffect(() => {
    setCar(carResponse)
  }, [carResponse])

  useEffect(() => {
    setLoading(true)
    const defaultUrl = '/api/lots?includeFilters=false&itemsPerPage=9'
    const markUrl = `${defaultUrl}&makes=${car.data.attributes.lotData.make}`
    const modelUrl = `${markUrl}&models=${car.data.attributes.lotData.model}`
    const yearUrl = `${modelUrl}&yearMin=${car.data.attributes.lotData.year}&yearMax=${car.data.attributes.lotData.year}`
    const yearUrlAnother = `${modelUrl}&yearMin=${
      car.data.attributes.lotData.year - 2
    }&yearMax=${car.data.attributes.lotData.year + 2}`

    const simillarFetches = [
      fetch(defaultUrl),
      fetch(markUrl),
      fetch(modelUrl),
      fetch(yearUrl),
      fetch(yearUrlAnother),
    ]
    Promise.all(simillarFetches)
      .then((response) => Promise.all(response.map((resp) => resp.json())))
      .then((data: ICarsFetchTypes[]) => {
        const [byDefault, byMark, byModel, byYear, byYearAnother] = data.map(
          (d) => {
            const filtred = d.data.filter((c) => c.id !== car.data.id)
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

  const certString = `${
    car.data.attributes.lotData.sale.saleDocument?.state || ''
  }-${car.data.attributes.lotData.sale.saleDocument?.type || ''}`

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
              <li className="car-page__breadcrumbs-link">
                {car.data.attributes.lotData.vin}
              </li>
            </ul>
          </nav>
        </div>
        <div className="container">
          <div className="car-page__name-wrapper">
            <h2 className="car-page__header-title">
              {`${car.data.attributes.lotData.year} ${car.data.attributes.lotData.make} ${car.data.attributes.lotData.model}`}
            </h2>
            <div className="car-page__name-inner">
              <h2 className="car-page__title">
                № Лота {car.data.attributes.auctionLotId}
              </h2>
              <h2 className="car-page__auction">
                Аукцион: {car.data.attributes.auction}
              </h2>
            </div>
          </div>
          <div className="car-page__info-wrapper">
            <div className="car-page__header">
              <div className="car-page__header-slider">
                <CarPageCarousel images={images} />
              </div>

              {car.data.attributes.auctionDate && (
                <>
                  <div className="car-page__header-timer-wrapper">
                    <div className="car-page__header-time">
                      до старта торгов осталось
                    </div>
                    <div className="car-page__header-timer">
                      <Countdown date={auctionDateEnd.toISOString()} />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="car-page__price-wrapper">
              <div className="car-page__price">
                <p>текущая ставка</p>
                <span>${car.data.attributes.lotData.sale.currentBid}</span>
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
                      {car.data.attributes.lotData.vin}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      тип документа:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.data.attributes.lotData.sale.saleDocument?.type ||
                        ''}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">Пробег:</span>
                    <span className="car-page__table-item-description">
                      {car.data.attributes.lotData.info.odometer?.value || 0}{' '}
                      миль
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">Топливо:</span>
                    <span className="car-page__table-item-description">
                      {
                        gas.find(
                          ({ value }) =>
                            value === car.data.attributes.lotData.info.fuelType
                        ).label
                      }
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">Привод:</span>
                    <span className="car-page__table-item-description">
                      {
                        driveLineTypes[
                          car.data.attributes.lotData.info.drivelineType - 1
                        ]
                      }
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Объём двигателя:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.data.attributes.lotData.info.engine.capacity}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Трансмиссия:
                    </span>
                    <span className="car-page__table-item-description">
                      {transmissions[
                        car.data.attributes.lotData.info.transmissionType
                      ]?.label || 'N/A'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Количество цилиндров:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.data.attributes.lotData.info.engine.cylinders}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Наличие ключей:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.data.attributes.lotData.info.keys
                        ? 'В наличии'
                        : 'Нету в наличии'}
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
                      {car.data.attributes.lotData.year}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      продавец:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.data.attributes.lotData.sale.seller.displayName}
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
                      {car.data.attributes.lotData.info.runnable
                        ? 'Заводится'
                        : 'Не заводится'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Основные повреждения:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.data.attributes.lotData.info.primaryDamage}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      второстепенные повреждения:
                    </span>
                    <span className="car-page__table-item-description">
                      {car.data.attributes.lotData.info?.secondaryDamage ||
                        'Отсутствуют'}
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
                      {carResponse.data.attributes.auctionDate
                        ? dateToText(auctionDateEnd)
                        : 'Не назначена'}
                    </span>
                  </div>
                  <div className="car-page__table-item">
                    <span className="car-page__table-item-title">
                      Время начала аукциона:
                    </span>
                    <span className="car-page__table-item-description">
                      {carResponse.data.attributes.auctionDate
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
