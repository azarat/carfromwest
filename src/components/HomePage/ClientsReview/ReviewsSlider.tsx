import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core'
import ReviewsItem from './ReviewsItem'
import { reviews } from '../../../constants/reviews'

// install Swiper modules
SwiperCore.use([Navigation, Pagination])

const ReviewsSlider: React.FC = () => {
  return (
    <>
      <Swiper navigation={true} pagination={{
                clickable: true,
              }} loop={true}>
        {reviews.map(({ name, images, text, profileLink }, index) => (
          <SwiperSlide key={name}>
            <ReviewsItem
              name={name}
              images={images}
              text={text}
              index={index}
              profileLink={profileLink}
              
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ReviewsSlider
