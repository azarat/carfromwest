import React, { useState } from 'react'
import { CarouselGridProps } from './Types'
import ArrowRightSVG from '../../assets/svg/arrow-right-car.svg'
const CarouselGrid: React.FC<CarouselGridProps> = ({
  images,
  setCurrentSlide,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const count_steps = images.length - 6
  const setNextStep = (): void => {
    const next_step = currentStep + 1

    if (next_step < count_steps) {
      setCurrentStep(next_step)
    }
    return
  }

  return (
    <div className="carousel-grid">
      <div className="carousel-grid__wrapper">
        <div
          className="carousel-grid__list"
          style={{
            width: '600%',
            left: 'calc(-' + currentStep * 51 + '%)',
          }}
        >
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
      <button className="carousel-grid__btn" onClick={setNextStep}>
        <ArrowRightSVG />
      </button>
    </div>
  )
}

export default CarouselGrid
