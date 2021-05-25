import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import SearchSVG from '../../assets/svg/search.svg'

const SearchInput: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const { push } = useRouter()

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setValue(currentTarget.value)
  }

  const handleSearch = (): void => {
    setValue('')
    push({
      pathname: '/catalog',
      query: {
        searchTerm: value,
      },
    })
  }

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        value={value}
        onChange={handleChange}
        id="search"
        className="search__input"
      />
      {value.length === 0 && (
        <label className="search__label" htmlFor="search">
          Введите номер лота, VIN или название авто
        </label>
      )}
      <SearchSVG onClick={handleSearch} />
    </form>
  )
}

export default SearchInput
