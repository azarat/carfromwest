import Link from 'next/link'
// SVG
import ArrowSVG from '../../assets/svg/carouselArrow.svg'
// Components
import Carousel from '../Carousel/Carousel'
import CatalogItem from '../CatalogGrid/CatalogItem'
import { ISimilarCarousel } from '../../Types/Types'

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
            )
          )}
      </Carousel>
    </div>
  )
}

export default TabletCarousel
