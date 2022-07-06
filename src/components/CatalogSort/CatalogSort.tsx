import Select from 'react-select'

import { sort } from '../../constants/filter'
// Types
import { CatalogSortProps } from './Types'

const CatalogSort: React.FC<CatalogSortProps> = ({
  handleSort,
  filter: { sortDirection, sortField },
  loading,
}): JSX.Element => {
  const customStyle = {
    control: () => ({
      border: 'none',
      display: 'flex',
    }),
    indicatorSeparator: () => ({}),
  }
  const value = sort.find(
    ({ value }) => value === `${sortField}--${sortDirection}`
  )
  return (
    <div className="sort-field">
      <div className="sort-field__select">
        <Select
          isDisabled={loading}
          defaultValue={value || sort[0]}
          onChange={handleSort}
          options={sort}
          styles={customStyle}
          className="sort-field__react-select"
          classNamePrefix="sort-field__react-select"
        />
      </div>
    </div>
  )
}

export default CatalogSort
