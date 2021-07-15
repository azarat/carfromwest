import Link from 'next/link'
// Components
import CatalogItem from './CatalogItem'
import CatalogGridEmpty from './CatalogGridEmpty'
// Types
import { CatalogGridProps } from './Types'
import Spinner from '../Spinner/Spinner'

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
              specifications: { fuelType },
              conditionInfo: { odometer },
              saleInfo: { currentBid },
              images,
            }) => (
              <Link key={vin} href={`/catalog/${auction}-${lotNumber}`}>
                <a className="catalog-grid__container-link">
                  <CatalogItem
                    fuelType={fuelType}
                    hightBid={+currentBid}
                    imageUrl={
                      images ? images[0].thumb : '/assets/images/no-image.jpg'
                    }
                    lotNumber={`${lotNumber}`}
                    make={make}
                    modelGroup={model}
                    odometer={odometer?.value || 0}
                    vin={vin}
                    year={year}
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
