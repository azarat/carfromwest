import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { popularAuto } from '../../constants/popularAuto'
// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper/core'
import SliderItem from './SliderItem'

// install Swiper modules
SwiperCore.use([Pagination, Navigation])

const PopularDesktopSlider: React.FC = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        grabCursor={true}
        slideToClickedSlide={true}
        loopAdditionalSlides={1}
      >
        {popularAuto.map(({ img, name, uaPrice, usaPrice, filterParams }) => (
          <SwiperSlide key={img}>
            <SliderItem
              name={name}
              uaPrice={uaPrice}
              usaPrice={usaPrice}
              img={img}
              filterParams={filterParams}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PopularDesktopSlider
