import React, { useContext } from 'react'
import Image from 'next/image'
import { ReviewsItemProps } from './Types'
import FullReviewContext from '../../../context/fullReviewContext'
import { FullReviewContextTypes } from '../../../context/Types'

const ReviewsItem: React.FC<ReviewsItemProps> = ({
  name,
  text,
  images,
  index,
}) => {
  const { setActiveReview, handleFullReview } = useContext(
    FullReviewContext
  ) as FullReviewContextTypes
  return (
    <div className="reviews-item">
      <div className="reviews-item__wrapper">
        <div className="reviews-item__review">
          <p className="reviews-item__name">{name}</p>
          <div
            className="reviews-item__text"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </div>
        <div className="reviews-item__btns-wrapper">
          <div className="reviews-item__btn-wrapper">
            <button
              className="reviews-item__btn"
              onClick={() => {
                setActiveReview(index)
                handleFullReview()
              }}
            >
              Развернуть отзыв
            </button>
          </div>
          <a
            target="_blank"
            href="https://www.google.com/maps/place/%D0%9A%D0%90%D0%A0%D0%A1%D0%A4%D0%A0%D0%9E%D0%9C%D0%92%D0%95%D0%A1%D0%A2+%D0%9A%D0%B8%D0%B5%D0%B2/@50.3931402,30.4899978,17z/data=!3m1!4b1!4m5!3m4!1s0x40d4c8ce74c9cea1:0x3dcbf27b84312b1f!8m2!3d50.3931346!4d30.49215"
            className="reviews-item__more-reviews"
            rel="noreferrer"
          >
            Смотреть больше отзывов
          </a>
        </div>

        <div className="reviews-item__photos">
          {images.slice(0, 4).map((el) => (
            <div key={el} className="reviews-item__photo-wrapper">
              <Image src={el} layout="fill" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewsItem
