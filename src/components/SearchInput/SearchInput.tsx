import React, { ChangeEvent, useState } from 'react'
import SearchSVG from '../../assets/svg/search.svg'

interface ISearchInput {
  id: string
}

const SearchInput: React.FC<ISearchInput> = ({ id }) => {
  const [value, setValue] = useState<string>('')

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setValue(currentTarget.value)
  }

  return (
    <div className="search">
      <input
        value={value}
        onChange={handleChange}
        id={id}
        className="search__input"
      />
      {value.length === 0 && (
        <label className="search__label" htmlFor={id}>
          Введите номер лота, VIN или название авто
        </label>
      )}
      <SearchSVG />
    </div>
  )
}

export default SearchInput
