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
import carFeatures from '../../../src/constants/carFeatures'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

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
  auction,
  vin
}): JSX.Element => {
  const router = useRouter()

  function matchCarsFeatures(parameter: any) {
    if(parameter) {
      parameter = parameter.toLowerCase()
    }
    const match: any = carFeatures.filter(item => item.eng.toLowerCase() === parameter)
    
    if(match.length > 0) {
      return match[0].ua
    }
    return
  }
  // console.log(condition);
  
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

  const handleCost = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('url', window.location.href)
      localStorage.setItem('autoVin', vin)
      router.push({ pathname: '/order' })
    }
  }

  return (
    <div className="catalog-grid__item">
      <div className="catalog-grid__item-image">
        <Link key={vin} href={`/catalog/lot/${auction}-${lotNumber}`}>
          <a>
            <Image
              src={imageUrl}
              layout="fill"
              objectFit="cover"
              quality={10}
              alt=""
            />
            {/* <img loading="lazy" src={imageUrl} alt="" /> */}
            <div className="catalog-grid__item-auction-date">
              <div className="catalog-grid__item-auction-date-label">
                Початок аукціону
              </div>
              <div className="catalog-grid__item-auction-date-value">
              {localeTime || 'Н/Д'} {localeDate}
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className="catalog-grid__item-info">
        <Link key={vin} href={`/catalog/lot/${auction}-${lotNumber}`}>
          <a>
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
          </a>
        </Link>
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
            {matchCarsFeatures(fuelType) || fuelType || 'Н/Д'}
          </div>
          <div className="catalog-grid__item-transmission">
            <TransmissionSVG />
            {matchCarsFeatures(transmissionType) || transmissionType || 'Н/Д'}
          </div>
          <div className="catalog-grid__item-drivetype">
            <DriveTypeSVG />
            {matchCarsFeatures(drivelineType) || drivelineType || "Н/Д"}
          </div>
          <div className="catalog-grid__item-health">
            <HeathSVG />
            {matchCarsFeatures(condition) || condition || 'Н/Д'}
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
            <div className="catalog-grid__item-crash-type-value">{matchCarsFeatures(primaryDamage) || primaryDamage || 'Відсутнє'}</div>
          </div>
          <div className="catalog-grid__item-crash-type">
            <div className="catalog-grid__item-crash-type-label">Другорядне пошкодження</div>
            <div className="catalog-grid__item-crash-type-value">{matchCarsFeatures(secondaryDamage) || secondaryDamage || 'Відсутнє'}</div>
          </div>
        </div>
        <div className="catalog-grid__item-descr pb-0">
          <button className="catalog-grid__item-calculate-btn" onClick={handleCost}>Порахувати вартість</button>
          <Link key={vin} href={`/catalog/lot/${auction}-${lotNumber}`}>
            <a className="catalog-grid__item-details-btn">Детальніше</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CatalogItem
