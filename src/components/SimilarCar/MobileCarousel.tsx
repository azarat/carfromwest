import Link from 'next/link'
// SVG
import ArrowSVG from '../../assets/svg/carouselArrow.svg'
import { gas } from '../../constants/filter'
import { ISimilarCarousel } from '../../Types/Types'
// Components
import Carousel from '../Carousel/Carousel'
import CatalogItem from '../CatalogGrid/CatalogItem'

const MobileCarousel: React.FC<ISimilarCarousel> = ({ data }): JSX.Element => {
  return (
    <div className="similar__mobile-carousel">
      <Carousel buttonNext={<ArrowSVG />} buttonPrev={<ArrowSVG />}>
        {data &&
          data.map(({ id, attributes: { auction, auctionLotId, lotData } }) => (
            <Link key={id} href={`/catalog/${auction}-${auctionLotId}`}>
              <a>
                <CatalogItem
                  fuelType={
                    gas.find(({ value }) => value === lotData.info.fuelType)
                      .label
                  }
                  hightBid={+lotData.sale.currentBid}
                  imageUrl={lotData.images[0].i}
                  lotNumber={`${auctionLotId}`}
                  make={lotData.make}
                  modelGroup={lotData.model}
                  odometer={lotData.info.odometer?.value || 0}
                  year={lotData.year}
                  vin={lotData.vin}
                />
              </a>
            </Link>
          ))}
      </Carousel>
    </div>
  )
}

export default MobileCarousel
