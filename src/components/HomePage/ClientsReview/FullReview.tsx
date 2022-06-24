import React, { useContext } from 'react'
import { reviews } from '../../../constants/reviews'
import { FullReviewProps } from './Types'
import Image from 'next/image'
// import { Swiper, SwiperSlide } from 'swiper/react'
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
  // const [initialSlide, setInitialSlide] = useState<number>(0)
  const initialSlide = 0;
  return (
    <>
    
      <div
        className={`full-review ${isFullReviewOpen ? 'full-review--open' : ''}`}
      >
        <div className="full-review__main-wrapper">
         <h2 className='full-review__title'>Наші клієнти, які вже отримали свої машини з США</h2>
        <div className="full-review__wrapper">
        <div
              className="full-review__close"
              onClick={handleFullReview}
              role="presentation"
            />
          <div className="full-review__left">
            <p className="full-review__name">
              {reviews[activeReview as number].name}
            </p>
            <div
            className="full-review__text"
            dangerouslySetInnerHTML={{
              __html: reviews[activeReview as number].text,
            }}
          ></div>
          </div>
          
          
          <div className="full-review__photos">
          {reviews[activeReview as number].images.map((el, i) => <div key={i} className="full-review__photo-wrapper">
            <Image src={el} layout="fill" objectFit="cover" />
          </div>
        )
      }
        </div>
          
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
