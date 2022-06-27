import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/thumbs/thumbs.min.css'

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from 'swiper/core'
import SliderItem from './SliderItem'
import { popularAuto } from '../../constants/popularAuto'
import { useRouter } from 'next/router'
import Link from 'next/link'

// install Swiper modules
SwiperCore.use([Navigation, Thumbs])

export const PopularSlider: React.FC = () => {
  const { push } = useRouter()
  // const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)

  return (
    <>
      <Swiper
        spaceBetween={16}
        loop
        // navigation
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="popular__mobile-main-slider"
        // thumbs={{ swiper: thumbsSwiper }}
      >
        {popularAuto.map(({ name, uaPrice, usaPrice, img, filterParams }) => {
          return (
            <Link key={name} href={{}}>
              <SwiperSlide className="auto-slide">
                <div
                  role="presentation"
                  onClick={() => {
                    push('/catalog', { query: filterParams })
                  }}
                >
                  <SliderItem
                    name={name}
                    uaPrice={uaPrice}
                    usaPrice={usaPrice}
                    img={img}
                    filterParams={filterParams}
                  />
                </div>
              </SwiperSlide>
            </Link>
          )
        })}
      </Swiper>
      {/* <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesVisibility
        watchSlidesProgress
        className="sub-slider"
      >
        {popularAuto.map(({ img }) => (
          <SwiperSlide key={img}>
            <img src={img} alt="car" />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </>
  )
}

export default PopularSlider
