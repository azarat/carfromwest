import React from 'react'
import { FullSizeImgProps } from './Types'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, EffectFade } from 'swiper/core'
import Image from 'next/image'

SwiperCore.use([Navigation, EffectFade])

const FullSizeImg: React.FC<FullSizeImgProps> = ({
  images,
  initialSlide,
  setFullImgOpen,
}) => {
  return (
    <div className="full-img">
      <div className="full-img__wrapper">
        <div
          className="full-img__close-wrapper"
          role="presentation"
          onClick={() => {
            setFullImgOpen(false)
          }}
        >
          <div className="full-img__close" />
        </div>
        <Swiper
          navigation={true}
          slidesPerView={1}
          effect="fade"
          initialSlide={initialSlide}
        >
          <div className="full-img__full-photos">
            {images.map((el, i) => (
              <SwiperSlide key={`${el}+${i}`}>
                <div className="full-img__photo-wrapper">
                  <Image src={el} layout="fill" objectFit="cover" />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  )
}

export default FullSizeImg
