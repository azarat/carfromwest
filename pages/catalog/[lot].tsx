import Image from 'next/image'
import Link from 'next/link'
import CarPageCarousel from '../../src/components/CarPageCarousel/CarPageCarousel'
// SVG
import InfoSVG from '../../src/assets/svg/info.svg'
import RightPolygonSVG from '../../src/assets/svg/right-polygon.svg'
import { NextPage } from 'next'
import { useEffect, useMemo, useState, useContext } from 'react'
// Types
import { CarPageProps } from '../../src/Types/Types'
import Countdown from '../../src/components/Countdown/Countdown'
import { dateToText } from '../../src/helpers/dateToText'
import Calculator from '../../src/components/Calculator/Calculator'
import SimilarCar from '../../src/components/SimilarCar/SimilarCar'
import ModalContext from '../../src/components/Modal/ModalContext'
import { driveLineTypes, gas, transmissions } from '../../src/constants/filter'
import { ICarsFetchTypes, ICar } from '../../src/components/CatalogGrid/Types'

const CarPage: NextPage<CarPageProps> = ({ carResponse }): JSX.Element => {
  const [car, setCar] = useState(carResponse)

  const [similarCar, setSimilarCar] = useState<ICar[]>([])
  const [loading, setLoading] = useState(false)
  const { setModalVisability } = useContext(ModalContext)
  const images = useMemo(
    () => car.data.attributes.lotData.images.map(({ i }) => i),
    [car]
  )

  const auctionDateEnd = new Date(carResponse.data.attributes.auctionDate)

  const fetchSimilar = async () => {
    setLoading(true)
    const defaultUrl = '/api/lots?includeFilters=false&itemsPerPage=9'
    const markUrl = `${defaultUrl}&makes=${car.data.attributes.lotData.make}`
    const modelUrl = `${markUrl}&models=${car.data.attributes.lotData.model}`
    const simillarFetches = [fetch(defaultUrl), fetch(markUrl), fetch(modelUrl)]
    Promise.all(simillarFetches)
      .then((response) => Promise.all(response.map((resp) => resp.json())))
      .then((data: ICarsFetchTypes[]) => {
        const [byDefault, byMark, byModel] = data.map((d) => {
          const filtred = d.data.filter((c) => c.id !== car.data.id)
          return {
            totalItems: filtred.length,
            data: filtred,
          }
        })
        if (byModel.totalItems !== 0) setSimilarCar(byModel.data)
        else if (byMark.totalItems !== 0) setSimilarCar(byMark.data)
        else if (byDefault.totalItems !== 0) setSimilarCar(byDefault.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchSimilar()
  }, [car])

  useEffect(() => {
    setCar(carResponse)
  }, [carResponse])

  const certString = `${
    car.data.attributes.lotData.sale.saleDocument?.state || ''
  }-${car.data.attributes.lotData.sale.saleDocument?.type || ''}`

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
          <h2 className="car-page__header-title">
            {`${car.data.attributes.lotData.year} ${car.data.attributes.lotData.make} ${car.data.attributes.lotData.model}`}
          </h2>
          <h2 className="car-page__title">
            № Лота {car.data.attributes.auctionLotId}
          </h2>
          <div className="car-page__header">
            <div className="car-page__header-slider">
              <CarPageCarousel images={images} />
            </div>

            <div className="car-page__header-price">
              <p>текущая ставка</p>
              <span>${car.data.attributes.lotData.sale.currentBid}</span>
            </div>
            {car.data.attributes.auctionDate && (
              <>
                <div className="car-page__header-timer-wrapper">
                  <div className="car-page__header-time">
                    До окончания торгов осталось
                  </div>
                  <div className="car-page__header-timer">
                    <Countdown date={auctionDateEnd.toISOString()} />
                  </div>
                </div>
              </>
            )}
            <div className="car-page__header-btn">
              <button
                className="car-page__header-button car-page__header-button-order"
                onClick={setModalVisability}
              >
                узнать больше
              </button>
              <a
                target="_blank"
                href={`https://vin.doctor/ru/report/check/${car.data.attributes.lotData.vin}`}
                className="car-page__header-button car-page__header-button-vin"
              >
                проверить VIN
              </a>
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
                  <span className="car-page__table-item-title">Пробег:</span>
                  <span className="car-page__table-item-description">
                    {car.data.attributes.lotData.info.odometer?.value || 0} миль
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
        <Calculator />
        <div className="car-page__request">
          <div className="container">
            <h2 className="car-page__request-title">
              Всё ещё в поисках желаемого авто?
            </h2>
            <h2 className="car-page__request-subtitle">
              Мы подберём для Вас лучшие варианты на выбор, оставляйте заявку!
            </h2>
            <button
              className="car-page__header-button car-page__header-button-request"
              onClick={setModalVisability}
            >
              оставить заявку
            </button>
          </div>
          <div className="car-page__request-image">
            <Image layout="fill" src="/assets/images/hyundai.png" />
          </div>
        </div>
        <SimilarCar data={similarCar} loading={loading} />
      </section>
    </div>
  )
}

export { getCarPageProps as getServerSideProps } from '../../src/utils/car'

export default CarPage
