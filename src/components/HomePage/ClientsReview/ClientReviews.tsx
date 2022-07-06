import React, { useState } from 'react'
import FullReviewContext from '../../../context/fullReviewContext'
import FullReview from './FullReview'
import ReviewsSlider from './ReviewsSlider'
import ReviewsTabletSlider from './ReviewsTabletSlider'

const ClientReviews: React.FC = () => {
  const [activeReview, setActiveReview] = useState<number | null>(null)
  const [isFullReviewOpen, setFullReviewOpen] = useState<boolean>(false)
  const handleFullReview = (): void => {
    const body = document.querySelector('body')
    body?.classList.toggle('fixed')
    setFullReviewOpen((prev) => !prev)
  }

  return (
    <FullReviewContext.Provider
      value={{
        activeReview,
        setActiveReview,
        isFullReviewOpen,
        handleFullReview,
      }}
    >
      <div id="client-reviews-section" className="client-reviews">
        <div className="client-reviews__wrapper">
          <h2 className="client-reviews__title">
            Наші клієнти, які вже отримали свої машини з США
          </h2>
          <div className="client-reviews__slider">
            <ReviewsSlider />
          </div>
          <div className="client-reviews__tablet-slider">
            <ReviewsTabletSlider />
          </div>
        </div>
      </div>
      {isFullReviewOpen && (
        <FullReview
          activeReview={activeReview}
          isFullReviewOpen={isFullReviewOpen}
        />
      )}
    </FullReviewContext.Provider>
  )
}

export default ClientReviews
