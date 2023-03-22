// import Link from 'next/link'
// Components
import CatalogItem from './CatalogItem'
import CatalogGridEmpty from './CatalogGridEmpty'
// Types
import { CatalogGridProps } from './Types'
import Spinner from '../Spinner/Spinner'
import { gas } from '../../constants/filter'
import { useEffect, useState } from 'react'

const CatalogGrid: React.FC<CatalogGridProps> = ({
  children,
  cars,
  loading,
}): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(loading)

  useEffect(() => {
    cars == undefined ? setLoading(true) : setLoading(false)
  }, [cars])

  if (!isLoading && cars && !cars?.dbLots?.length) {
    return (
      <div className="catalog-grid">
        <CatalogGridEmpty />
      </div>
    )
  }

  return (
    <div className="catalog-grid">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="catalog-grid__container">
          {cars &&
            cars?.dbLots.map(
              ({
                auction,
                lotNumber,
                lotInfo: { vin, make, model, year },
                specifications: {
                  fuelType,
                  engine,
                  transmissionType,
                  drivelineType,
                },
                conditionInfo: {
                  odometer,
                  condition,
                  primaryDamage,
                  secondaryDamage,
                },
                saleInfo: { currentBid },
                images,
                auctionDate,
              }) => (
                // <Link key={vin} href={`/catalog/lot/${auction}-${lotNumber}`}>

                <div
                  className="catalog-grid__container-link"
                  key={vin + lotNumber}
                >
                  <CatalogItem
                    fuelType={
                      gas.find((f) => f.value === fuelType.toLowerCase())
                        ?.label || ''
                    }
                    hightBid={+currentBid.value}
                    imageUrl={
                      images ? images[0].full : '/assets/images/no-image.jpg'
                    }
                    lotNumber={`${lotNumber}`}
                    make={make}
                    modelGroup={model}
                    odometer={odometer?.value || 0}
                    vin={vin}
                    year={year}
                    auctionDate={auctionDate}
                    engine={engine?.capacity}
                    transmissionType={transmissionType}
                    drivelineType={drivelineType}
                    condition={condition}
                    primaryDamage={primaryDamage}
                    secondaryDamage={secondaryDamage}
                    auction={auction}
                  />
                </div>
                // </Li nk>
              )
            )}
        </div>
      )}
      {!isLoading && children}
    </div>
  )
}

export default CatalogGrid
