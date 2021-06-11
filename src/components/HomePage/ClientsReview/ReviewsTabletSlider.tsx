import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper/core'
import ReviewsItem from './ReviewsItem'
import { reviews } from '../../../constants/reviews'

// install Swiper modules
SwiperCore.use([Navigation])

export const ReviewsTabletSlider: React.FC = () => {
  return (
    <>
      <Swiper
        navigation={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        spaceBetween={10}
        initialSlide={1}
        grabCursor={true}
        slideToClickedSlide={true}
        breakpoints={{
          1800: { spaceBetween: 250 },
          2300: { spaceBetween: 500 },
        }}
      >
        {reviews.map(({ name, images, text }, index) => (
          <SwiperSlide key={name}>
            <ReviewsItem
              name={name}
              images={images}
              text={text}
              index={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ReviewsTabletSlider
