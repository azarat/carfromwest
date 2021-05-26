import React from 'react'
import PopularSlider from './PopularSlider'
import PopularDesktopSlider from './PopularDekstopSlider'

const PopularAuto: React.FC = () => {
  return (
    <div className="popular">
      <div className="popular__wrapper">
        <h2 className="popular__title">Популярные авто из США</h2>
        <div className="popular__mobile-slider">
          <PopularSlider />
        </div>
        <div className="popular__desktop-slider">
          <PopularDesktopSlider />
        </div>
      </div>
    </div>
  )
}

export default PopularAuto
