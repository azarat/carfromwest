import React, { useContext } from 'react'
import { reviews } from '../../../constants/reviews'
import { FullReviewProps } from './Types'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import FullReviewContext from '../../../context/fullReviewContext'
import { FullReviewContextTypes } from '../../../context/Types'
import { useState } from 'react'
import FullSizeImg from './FullSizeImg'

SwiperCore.use([Navigation])

const FullReview: React.FC<FullReviewProps> = ({
  isFullReviewOpen,
  activeReview,
}) => {
  const { handleFullReview } = useContext(
    FullReviewContext
  ) as FullReviewContextTypes

  const [isFullImgOpen, setFullImgOpen] = useState<boolean>(false)
  //initial slide for full size slider
  const [initialSlide, setInitialSlide] = useState<number>(0)

  return (
    <>
      <div
        className={`full-review ${isFullReviewOpen ? 'full-review--open' : ''}`}
      >
        <div className="full-review__wrapper">
          <div className="full-review__top">
            <p className="full-review__name">
              {reviews[activeReview as number].name}
            </p>
            <div
              className="full-review__close"
              onClick={handleFullReview}
              role="presentation"
            />
          </div>
          <a
            href={reviews[activeReview as number].profileLink}
            className="full-review__link"
            target="_blank"
            rel="noreferrer"
          >
            Профиль в facebook
          </a>
          <div
            className="full-review__text"
            dangerouslySetInnerHTML={{
              __html: reviews[activeReview as number].text,
            }}
          ></div>
          <div className="full-review__photos">
            <Swiper
              navigation={true}
              breakpoints={{
                320: { slidesPerView: 2 },
                768: {
                  slidesPerView: 3,
                },
              }}
            >
              {reviews[activeReview as number].images.map((el, i) => (
                <SwiperSlide
                  key={el}
                  onClick={() => {
                    setFullImgOpen(true)
                    setInitialSlide(i)
                  }}
                >
                  <div className="full-review__photo-wrapper">
                    <Image src={el} layout="fill" objectFit="cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {isFullImgOpen && (
        <FullSizeImg
          images={reviews[activeReview as number].images}
          initialSlide={initialSlide}
          setFullImgOpen={setFullImgOpen}
        />
      )}
    </>
  )
}

export default FullReview
