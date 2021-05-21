import { Dispatch, SetStateAction } from 'react'
import FilterSVG from '../../assets/svg/filter.svg'
import { IFilter } from '../FilterFull/Types'

type FilterFieldProps = {
  loading: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  filter: Partial<IFilter>
  setFilter: Dispatch<SetStateAction<Partial<IFilter>>>
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
          <FilterSVG />
        </div>
        <div className="filter-field__button-text">Фильтр</div>
      </div>
    </div>
  )
}

export default FilterField
