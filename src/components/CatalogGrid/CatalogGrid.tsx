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
  if (!loading && !cars?.data.length) {
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
          cars.data.map(
            ({
              attributes: {
                auction,
                auctionLotId,
                lotData: {
                  vin,
                  make,
                  year,
                  model,
                  images,
                  sale: { currentBid },
                  info: { fuelType, odometer },
                },
              },
            }) => (
              <Link key={vin} href={`/catalog/${auction}-${auctionLotId}`}>
                <a className="catalog-grid__container-link">
                  <CatalogItem
                    fuelType={gas.find(({ value }) => value === fuelType).label}
                    hightBid={+currentBid}
                    imageUrl={
                      images ? images[0].i : '/assets/images/no-image.jpg'
                    }
                    lotNumber={`${auctionLotId}`}
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
