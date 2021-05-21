import Select from 'react-select'

import { sort } from '../../constants/filter'
// Types
import { CatalogSortProps } from './Types'

const CatalogSort: React.FC<CatalogSortProps> = ({
  handleSort,
  loading,
}): JSX.Element => {
  const customStyle = {
    control: () => ({
      border: 'none',
      display: 'flex',
    }),
    indicatorSeparator: () => ({}),
  }
  return (
    <div className="sort-field">
      <div className="sort-field__text">Сортировать</div>
      <div className="sort-field__select">
        <Select
          isDisabled={loading}
          defaultValue={sort[0]}
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
