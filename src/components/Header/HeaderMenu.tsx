import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { NavItems } from '../../constants/NavItems'
import SocialLink from '../SocialLink/SocialLink'

interface IHeaderMenu {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HeaderMenu: React.FC<IHeaderMenu> = ({ open, setOpen }) => {
  return (
    <div className={`header-menu ${open ? 'header-menu--open' : ''}`}>
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
      <div className="header-menu__phone">
        <span className="header-menu__phone-number">
          <a
            className="header-menu__phone-number-link header-menu__phone-number-link--desktop"
            href="tel:+380443343869"
          >
            +38 (044) 334-38-69
          </a>
          <a
            className="header-menu__phone-number-link header-menu__phone-number-link--mobile"
            href="tel:0683288818"
          >
            068 328 88 18
          </a>
        </span>
        <span className="header-menu__phone-cost">Звонок бесплатный</span>
      </div>
    </div>
  )
}

export default HeaderMenu
