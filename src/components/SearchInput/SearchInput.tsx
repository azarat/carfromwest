import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEventHandler, useState } from 'react'
import SearchSVG from '../../assets/svg/search.svg'

interface ISearchInput {
  id: string
}

const SearchInput: React.FC<ISearchInput> = ({ id }) => {
  const [value, setValue] = useState<string>('')
  const { push } = useRouter()

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setValue(currentTarget.value)
  }

  const handleSearch: FormEventHandler = (e): void => {
    e.preventDefault()
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
        id={id}
        className="search__input"
      />
      {value.length === 0 && (
        <label className="search__label" htmlFor={id}>
          Введите номер лота, VIN или название авто
        </label>
      )}
      <SearchSVG onClick={handleSearch} />
    </form>
  )
}

export default SearchInput
