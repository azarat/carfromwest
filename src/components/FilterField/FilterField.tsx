import { Dispatch, SetStateAction } from 'react'
import AuctionSVG from '../../assets/svg/auction.svg'
import { IFilter } from '../FilterFull/Types'

type FilterFieldProps = {
  loading: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  filter: Partial<IFilter>
  setFilter: Dispatch<SetStateAction<Partial<IFilter>>>
  mobileActive?: boolean
}

const FilterField: React.FC<FilterFieldProps> = ({ setOpen }): JSX.Element => {
  return (
    <div className="filter-field">
      <div
        role="presentation"
        onClick={() => setOpen((prev: any) => !prev)}
        className="filter-field__button"
      >
        <div className="filter-field__button-icon">
          <AuctionSVG />
        </div>
        <div className="filter-field__button-text">Авто з аукціонів</div>
      </div>
    </div>
  )
}

export default FilterField
