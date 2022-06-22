import { EventHandler, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
// Types
import { CatalogSearchProps } from './Types'
// SVG
import SearchSVG from '../../assets/svg/search.svg'

const CatalogSearch: React.FC<CatalogSearchProps> = ({
  handleSearch,
  loading,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(value)
  }

  const handleSubmit: EventHandler<FormEvent> = (e) => {
    e.preventDefault()
    handleSearch(searchValue)
    setSearchValue('')
    router.push({ pathname: '/catalog/', query: { searchTerm: searchValue } })
  }

  return (
    <form className="catalog__search" onSubmit={handleSubmit}>
      <SearchSVG />
      <input
        disabled={loading}
        className="catalog__search-input"
        placeholder="Введите номер лота, VIN или название авто"
        onChange={handleChange}
        value={searchValue}
        type="text"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="catalog__search-btn"
      >
        Знайти
      </button>
    </form>
  )
}

export default CatalogSearch
