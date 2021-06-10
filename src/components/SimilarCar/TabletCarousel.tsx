import Link from 'next/link'
// SVG
import ArrowSVG from '../../assets/svg/carouselArrow.svg'
// Components
import Carousel from '../Carousel/Carousel'
import CatalogItem from '../CatalogGrid/CatalogItem'
import { ISimilarCarousel } from '../../Types/Types'
import { gas } from '../../constants/filter'

const chunk = <T extends unknown>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
    arr.slice(i * size, i * size + size)
  )

const TabletCarousel: React.FC<ISimilarCarousel> = ({ data }): JSX.Element => {
  const chunkData = chunk(data, 2)
  return (
    <div className="similar__tablet-carousel">
      <Carousel buttonNext={<ArrowSVG />} buttonPrev={<ArrowSVG />}>
        {data &&
          chunkData.map((data) =>
            data.map(
              ({ id, attributes: { auction, auctionLotId, lotData } }) => (
                <Link key={id} href={`/catalog/${auction}-${auctionLotId}`}>
                  <a>
                    <CatalogItem
                      fuelType={
                        gas.find(({ value }) => value === lotData.info.fuelType)
                          ?.label || null
                      }
                      hightBid={+lotData.sale.currentBid}
                      imageUrl={
                        lotData.images
                          ? lotData.images[0]?.i
                          : '/assets/images/no-image.jpg'
                      }
                      lotNumber={`${auctionLotId}`}
                      make={lotData.make}
                      modelGroup={lotData.model}
                      odometer={lotData.info.odometer?.value || 0}
                      year={lotData.year}
                      vin={lotData.vin}
                    />
                  </a>
                </Link>
              )
            )
          )}
      </Carousel>
    </div>
  )
}

export default TabletCarousel
