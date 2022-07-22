import React, { useState } from 'react'
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
// import { useRouter } from 'next/router'
import Spinner from '../Spinner/Spinner'

// install Swiper modules
SwiperCore.use([Navigation, Thumbs])

export const PopularSlider: React.FC = () => {
  // const { push } = useRouter()
  // const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)
  const [isLoading, setLoading] = useState(false)

  return (
    <>
      <div className={`filter-spinner valigned${isLoading ? ' loading' : ''}`}><Spinner /></div>
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
              <SwiperSlide className="auto-slide" key={name}>
                <div onClick={()=>{
                  setLoading(true)
                  }}>
                  <SliderItem
                    name={name}
                    uaPrice={uaPrice}
                    usaPrice={usaPrice}
                    img={img}
                    filterParams={filterParams}
                  />
                </div>
              </SwiperSlide>
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
