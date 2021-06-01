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
          <p className="reviews-item__text">{text}</p>
        </div>
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
        <a href="" className="reviews-item__more-reviews">
          Смотреть больше отзывов
        </a>

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
