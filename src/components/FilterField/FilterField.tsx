import { Dispatch, SetStateAction } from 'react'
import FilterSVG from '../../assets/svg/filter.svg'
import { gas, transmissions, vehicleTypes } from '../../constants/filter'
import { IFilter } from '../FilterFull/Types'

type FilterFieldProps = {
  loading: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  filter: Partial<IFilter>
  setFilter: Dispatch<SetStateAction<Partial<IFilter>>>
}

const FilterField: React.FC<FilterFieldProps> = ({
  setOpen,
  filter,
  setFilter,
  loading,
}): JSX.Element => {
  return (
    <div className="filter-field">
      <div
        onClick={() => setOpen((prev: any) => !prev)}
        className="filter-field__button"
      >
        <div className="filter-field__button-icon">
          <FilterSVG />
        </div>
        <div className="filter-field__button-text">Фильтр</div>
      </div>
      <div className="filter-field__grid">
        {Object.keys(filter)
          .filter((key) => {
            if (['sortField', 'sortDirection'].includes(key)) return false
            return !!filter[key]
          })
          .map((key) => {
            let title = filter[key]
            if (key === 'type')
              title = vehicleTypes.filter((val) => val.value === filter[key])[0]
                .title
            if (key === 'fuelTypes')
              title = gas.filter((val) => val.value === filter[key])[0].label
            if (key === 'transmissionTypes')
              title = transmissions.filter(
                (val) => val.value === filter[key]
              )[0].label
            if (/^year_min$/.test(key)) title = `c ${title}`
            else if (/_min$/.test(key) || key === 'Price') title = `от ${title}`
            if (/_max$/.test(key)) title = `до ${title}`
            if (/^Price/.test(key)) title = `${title}$`
            if (/^year/.test(key)) title = `${title}г.`
            if (/^engine/.test(key)) title = `${title}л.`

            return (
              <div key={title} className="filter-field__grid-item">
                <div className="filter-field__grid-item-text">{title}</div>
                <button
                  disabled={loading}
                  className="filter-field__grid-item-delete"
                  onClick={() => {
                    setFilter(
                      Object.keys(filter)
                        .filter((k) => !!filter[k] && k !== key)
                        .reduce(
                          (obj, key) =>
                            Object.assign(obj, { [key]: filter[key] }),
                          {}
                        ) as IFilter
                    )
                  }}
                />
              </div>
            )
          })}
      </div>
      {Object.keys(filter).length > 0 && (
        <button
          className="filter-field__grid-item"
          onClick={() => {
            setFilter({})
          }}
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  )
}

export default FilterField
