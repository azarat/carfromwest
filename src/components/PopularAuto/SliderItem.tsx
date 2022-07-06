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
    if (typeof document !== 'undefined') {
      document.body.scrollIntoView()

      let url = '';
      if (filterParams.makes) url += `/brand-is-${filterParams.makes}`
      if (filterParams.models) url += `/model-is-${filterParams.models}`
      if (filterParams.yearMin) url += `/yearStart-is-${filterParams.yearMin}`

      push('/catalog' + url)
    }
  }

  return (
    <div role="presentation" className="slider-item" onClick={handleCatalog}>
      <img src={img} alt="car-full" className="slider-item__img" />
      <div className="slider-item__inner">
        <p className="slider-item__name">{name}</p>
        <p className="slider-item__price">
           {usaPrice}$ з США з ремонтом
        </p>
        <p className="slider-item__price-ua">
          {uaPrice}$ аналог в Україні
        </p>
        <button className="slider-item__btn">Подивитись</button>
      </div>
    </div>
  )
}

export default SliderItem
