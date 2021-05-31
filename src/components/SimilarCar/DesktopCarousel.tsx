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

const DesktopCarousel: React.FC<ISimilarCarousel> = ({ data }): JSX.Element => {
  const chunkData = chunk(data, 3)
  return (
    <div className="similar__desktop-carousel">
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
              )
            )
          )}
      </Carousel>
    </div>
  )
}

export default DesktopCarousel
