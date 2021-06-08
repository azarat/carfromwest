import { useRouter } from 'next/router'
import React from 'react'
import { SliderItemProps } from './Types'

const SliderItem: React.FC<SliderItemProps> = ({
  name,
  uaPrice,
  usaPrice,
  img,
  filterParams,
}) => {
  const { push } = useRouter()

  const handleCatalog = (): void => {
    push({ pathname: '/catalog', query: filterParams })
  }

  return (
    <div role="presentation" className="slider-item" onClick={handleCatalog}>
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
