import Link from 'next/link'
// SVG
import ArrowSVG from '../../assets/svg/carouselArrow.svg'
import { ISimilarCarousel } from '../../Types/Types'
// Components
import Carousel from '../Carousel/Carousel'
import CatalogItem from '../CatalogGrid/CatalogItem'

const MobileCarousel: React.FC<ISimilarCarousel> = ({ data }): JSX.Element => {
  return (
    <div className="similar__mobile-carousel">
      <Carousel buttonNext={<ArrowSVG />} buttonPrev={<ArrowSVG />}>
        {data &&
          data.map(
            ({
              auction,
              lotNumber,
              lotInfo,
              saleInfo,
              images,
              specifications: { fuelType },
              conditionInfo: { odometer },
            }) => (
              <Link
                key={`${auction}-${lotNumber}`}
                href={`/catalog/${auction}-${lotNumber}`}
              >
                <a>
                  <CatalogItem
                    fuelType={fuelType}
                    hightBid={+saleInfo.currentBid.value}
                    imageUrl={
                      images ? images[0]?.full : '/assets/images/no-image.jpg'
                    }
                    lotNumber={`${lotNumber}`}
                    make={lotInfo.make}
                    modelGroup={lotInfo.model}
                    odometer={odometer?.value || 0}
                    year={lotInfo.year}
                    vin={lotInfo.vin}
                  />
                </a>
              </Link>
            )
          )}
      </Carousel>
    </div>
  )
}

export default MobileCarousel
