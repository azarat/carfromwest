import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { NavItems } from '../../constants/NavItems'
import SocialLink from '../SocialLink/SocialLink'
import SearchInput from '../SearchInput/SearchInput'
interface IHeaderMenu {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HeaderMenu: React.FC<IHeaderMenu> = ({ open, setOpen }) => {
  return (
    <div className={`header-menu ${open ? 'header-menu--open' : ''}`}>
      <div className="header__search header__search-mob">
          <SearchInput id="header-search" />
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
