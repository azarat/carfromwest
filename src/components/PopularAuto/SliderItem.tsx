import React from 'react'
import { SliderItemProps } from './Types'

const SliderItem: React.FC<SliderItemProps> = ({
  name,
  uaPrice,
  usaPrice,
  img,
}) => {
  return (
    <div className="slider-item">
      <img src={img} alt="car-full" className="slider-item__img" />
      <p className="slider-item__name">{name}</p>
      <p className="slider-item__price">
        <strong>$ {usaPrice}</strong> из США с ремонтом
      </p>
      <p className="slider-item__price">
        <strong>$ {uaPrice}</strong> аналогом из Украины
      </p>
    </div>
  )
}

export default SliderItem
