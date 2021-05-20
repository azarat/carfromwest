// Types
import { CatalogItemProps } from './Types'

const CatalogItem: React.FC<CatalogItemProps> = ({
  fuelType,
  hightBid,
  imageUrl,
  lotNumber,
  make,
  modelGroup,
  odometer,
  year,
}): JSX.Element => {
  return (
    <div className="catalog-grid__item">
      <div className="catalog-grid__item-image">
        <img loading="lazy" src={imageUrl} alt="" />
      </div>
      <div className="catalog-grid__item-header">
        <h5 className="catalog-grid__item-title">
          {year} {make} {modelGroup}
        </h5>
        <h6 className="catalog-grid__item-lot">лот {lotNumber}</h6>
      </div>
      <div className="catalog-grid__item-descr">
        <div className="catalog-grid__item-mileage">
          <span>пробег:</span> {odometer} миль
        </div>
        <div className="catalog-grid__item-engine">
          <span>тип двигателя:</span> {fuelType}
        </div>
        <div className="catalog-grid__item-gas">
          <span>Топливо:</span> {fuelType}
        </div>
        <div className="catalog-grid__item-price">
          <span>текущая ставка</span> $ {hightBid}
        </div>
      </div>
    </div>
  )
}

export default CatalogItem
