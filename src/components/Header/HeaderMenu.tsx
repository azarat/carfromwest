import React, { Dispatch, SetStateAction, ChangeEvent, FormEventHandler, useState } from 'react'
import Link from 'next/link'
import { NavItems } from '../../constants/NavItems'
import SocialLink from '../SocialLink/SocialLink'
import { useRouter } from 'next/router'
import SearchSVG from '../../assets/svg/search.svg'
interface IHeaderMenu {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HeaderMenu: React.FC<IHeaderMenu> = ({ open, setOpen }) => {
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
    setOpen(((prev: boolean) => !prev))
  }
  return (
    <div className={`header-menu ${open ? 'header-menu--open' : ''}`}>
      <div className="header__search header__search-mob">
          <form className="search" onSubmit={handleSearch}>
      <input
        value={value}
        onChange={handleChange}
        id='header-search'
        className="search__input"
      />
      {value.length === 0 && (
        <label className="search__label" htmlFor='header-search'>
          Номер лоту, VIN чи назву авто
        </label>
      )}
      <SearchSVG onClick={handleSearch} />
    </form>
        </div>
      <nav className="header-menu__nav">
        <ul className="header-menu__nav-list">
          {NavItems.map(({ id, href, title }, idx) => (
            <li key={id} className="header-menu__nav-item">
              <Link href={href}>
                <a
                  className="header-menu__nav-item-link"
                  tabIndex={idx}
                  role="link"
                  onClick={() => setOpen((prev: boolean) => !prev)}
                >
                  {title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <SocialLink />
    </div>
  )
}

export default HeaderMenu
