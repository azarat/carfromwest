// Types
import { CatalogItemProps } from './Types'
import MileageSVG from '../../../src/assets/svg/mileage.svg'
import EngineVolumeSVG from '../../../src/assets/svg/engine_volume.svg'
import FuelTypeSVG from '../../../src/assets/svg/fuel_type.svg'
import HeathSVG from '../../../src/assets/svg/heath.svg'
import CalendarSVG from '../../../src/assets/svg/calendar.svg'
import TransmissionSVG from '../../../src/assets/svg/transmission.svg'
import CrashTypeSVG from '../../../src/assets/svg/crash_type.svg'
import DriveTypeSVG from '../../../src/assets/svg/drive_type.svg'

const CatalogItem: React.FC<CatalogItemProps> = ({
  fuelType,
  // hightBid,
  imageUrl,
  lotNumber,
  make,
  modelGroup,
  odometer,
  year,
  auctionDate,
  engine,
  transmissionType,
  drivelineType,
  condition,
  primaryDamage,
  secondaryDamage,
  auction
}): JSX.Element => {

  let localeDate
  let localeTime
  let auctionDateEnd
  if(auctionDate) {
  auctionDateEnd = new Date(auctionDate)

  const optionsTime: any = {  hour: "numeric", minute: "numeric" };
  const optionsDate: any = {  year: 'numeric', month: 'numeric', day: 'numeric' };
  
  localeDate = auctionDateEnd.toLocaleString("ua", optionsDate);
  localeTime = auctionDateEnd.toLocaleString("ua", optionsTime);
}
  
  return (
    <div className="catalog-grid__item">
      <div className="catalog-grid__item-image">
        <img loading="lazy" src={imageUrl} alt="" />
        <div className="catalog-grid__item-auction-date">
          <div className="catalog-grid__item-auction-date-label">
            Початок аукціону
          </div>
          <div className="catalog-grid__item-auction-date-value">
           {localeTime || 'Н/Д'} {localeDate}
          </div>
        </div>
      </div>
      <div className="catalog-grid__item-info">
        <div className="catalog-grid__item-header">
          <div className="catalog-grid__item-header-logo">
           {auction === 'copart' ? <img loading="lazy" src="/assets/images/copart.png" alt="" /> : <img loading="lazy" src="/assets/images/iaai.png" alt="" />} 
          </div>
          <div className="catalog-grid__item-header-title">
            <h6 className="catalog-grid__item-lot">#{lotNumber}</h6>
            <h5 className="catalog-grid__item-title">
              {year} {make} {modelGroup}
            </h5>
          </div>
        </div>
        <div className="catalog-grid__item-descr">
          <div className="catalog-grid__item-mileage">
            <MileageSVG />
            {`${odometer} км` || 'Н/Д'}
          </div>
          <div className="catalog-grid__item-engine">
            <EngineVolumeSVG />
            {`${engine} л` || 'Н/Д'}
          </div>
          <div className="catalog-grid__item-gas">
            <FuelTypeSVG />
            {fuelType || 'Н/Д'}
          </div>
          <div className="catalog-grid__item-transmission">
            <TransmissionSVG />
            {transmissionType || 'Н/Д'}
          </div>
          <div className="catalog-grid__item-drivetype">
            <DriveTypeSVG />
            {drivelineType || "Н/Д"}
          </div>
          <div className="catalog-grid__item-health">
            <HeathSVG />
            {condition || 'Н/Д'}
          </div>
          <div className="catalog-grid__item-year">
            <CalendarSVG />
            {year || 'Н/Д'}
          </div>
        </div>
        <div className="catalog-grid__item-descr nowrap">
          <CrashTypeSVG />
          <div className="catalog-grid__item-crash-type">
            <div className="catalog-grid__item-crash-type-label">Основне пошкодження</div>
            <div className="catalog-grid__item-crash-type-value">{primaryDamage || 'Відсутнє'}</div>
          </div>
          <div className="catalog-grid__item-crash-type">
            <div className="catalog-grid__item-crash-type-label">Другорядне пошкодження</div>
            <div className="catalog-grid__item-crash-type-value">{secondaryDamage || 'Відсутнє'}</div>
          </div>
        </div>
        <div className="catalog-grid__item-descr pb-0">
          <button className="catalog-grid__item-calculate-btn">Порахувати вартість</button>
          <button className="catalog-grid__item-details-btn">Детальніше</button>
        </div>
      </div>
    </div>
  )
}

export default CatalogItem
