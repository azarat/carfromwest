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

// install Swiper modules
SwiperCore.use([Navigation, Thumbs])

export const PopularSlider: React.FC = () => {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        className="popular__mobile-main-slider"
      >
        {popularAuto.map(({ name, uaPrice, usaPrice, img }) => (
          <SwiperSlide key={name}>
            <SliderItem
              name={name}
              uaPrice={uaPrice}
              usaPrice={usaPrice}
              img={img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}
        className="sub-slider"
      >
        {popularAuto.map(({ img }) => (
          <SwiperSlide key={img}>
            <img src={img} alt="car" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PopularSlider
