import Select from 'react-select'

import { sort } from '../../constants/filter'
// Types
import { CatalogSortProps } from './Types'

const CatalogSort: React.FC<CatalogSortProps> = ({
  handleSort,
  loading,
}): JSX.Element => {
  return (
    <div className="sort-field">
      <div className="sort-field__text">Сортировать</div>
      <div className="sort-field__select">
        <Select
          isDisabled={loading}
          defaultValue={sort[0]}
          onChange={handleSort}
          options={sort}
        />
      </div>
    </div>
  )
}

export default CatalogSort
