import React from 'react'
import { CarouselGridProps } from './Types'
const CarouselGrid: React.FC<CarouselGridProps> = ({
  images,
  setCurrentSlide,
}) => {
  return (
    <div className="carousel-grid">
      <div className="carousel-grid__list">
        {images.map((el, i) => (
          <div
            key={el}
            className="carousel-grid__item"
            onClick={() => {
              setCurrentSlide(i)
            }}
            role="presentation"
          >
            <img className="carousel-grid__item-img" src={el} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarouselGrid
