import React from 'react'
import PopularSlider from './PopularSlider'
import PopularDesktopSlider from './PopularDekstopSlider'

const PopularAuto: React.FC = () => {
  return (
    <div id="section-popular" className="popular">
      <div className="popular__wrapper">
        <h2 className="popular__title">Популярні авто із США</h2>
        <div className="popular__mobile-slider-wrapper">
          <PopularSlider />
        </div>
        <div className="popular__desktop-slider-wrapper">
          <PopularDesktopSlider />
        </div>
      </div>
    </div>
  )
}

export default PopularAuto
