import React, { useState } from 'react'

import TelegramSVG from '../../assets/svg/telegram.svg'
import PhoneSVG from '../../assets/svg/phone.svg'
import HeaderMenu from './HeaderMenu'
import SearchInput from '../SearchInput/SearchInput'
import Link from 'next/link'

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenMenu = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link href="/">
            <a>
              <img
                className="header__logo-img"
                src="/assets/images/logo.png"
                alt="Логотип"
              />
            </a>
          </Link>
        </div>
        <div className="header__search">
          <SearchInput id="header-search" />
        </div>
        <div className="header__contact">
          <div className="header__contact-item">
            <div className="header__contact-item-icon">
              <a href="#">
                <TelegramSVG />
              </a>
            </div>
            <div className="header__contact-item-text">ПИШИТЕ В ТЕЛЕГРАМ</div>
          </div>
          <div className="header__contact-item">
            <div className="header__contact-item-icon">
              <a href="#">
                <PhoneSVG />
              </a>
            </div>
            <Link href="/check">
              <a>
                <div className="header__contact-item-text">ЗАКАЗАТЬ ЗВОНОК</div>
              </a>
            </Link>
          </div>
        </div>

        <div
          role="presentation"
          onClick={handleOpenMenu}
          className="header__menu"
        >
          <div
            className={
              open
                ? `header__menu-burger header__menu-burger--open`
                : 'header__menu-burger'
            }
          >
            <span className="header__menu-burger-stroke-top" />
            <span className="header__menu-burger-stroke" />
            <span className="header__menu-burger-stroke-bottom" />
          </div>
        </div>
        <div className="header__phone">
          <a href="tel:0800215804">0 800 215 804</a>
        </div>
      </header>
      <HeaderMenu open={open} setOpen={handleOpenMenu} />
    </>
  )
}

export default Header
