import Link from 'next/link'
// Components
import CatalogItem from './CatalogItem'
import CatalogGridEmpty from './CatalogGridEmpty'
// Types
import { CatalogGridProps } from './Types'
import Spinner from '../Spinner/Spinner'
import { gas } from '../../constants/filter'

const CatalogGrid: React.FC<CatalogGridProps> = ({
  children,
  cars,
  loading,
}): JSX.Element => {
  if (!loading && !cars?.items.length) {
    return (
      <div className="catalog-grid">
        <CatalogGridEmpty />
      </div>
    )
  }
  return (
    <div className="catalog-grid">
      {loading && <Spinner />}
      <div className="catalog-grid__container">
        {!loading &&
          cars &&
          cars.items.map(
            ({
              auction,
              lotNumber,
              lotInfo: { vin, make, model, year },
              specifications: { fuelType, engine, transmissionType, drivelineType },
              conditionInfo: { odometer, condition, primaryDamage, secondaryDamage },
              saleInfo: { currentBid },
              images,
              auctionDate
              
            }) => (
              <Link key={vin} href={`/catalog/${auction}-${lotNumber}`}>
                <a className="catalog-grid__container-link">
                  <CatalogItem
                    fuelType={
                      gas.find((f) => f.value === fuelType)?.label || ''
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
                </a>
              </Link>
            )
          )}
      </div>
      {!loading && children}
    </div>
  )
}

export default CatalogGrid
