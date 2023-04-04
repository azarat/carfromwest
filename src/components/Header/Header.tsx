import React, { useState } from 'react'
// import TelegramSVG from '../../assets/svg/telegram.svg'
import TelegramSVG from '../../assets/svg/telegram-2.svg'
// import PhoneSVG from '../../assets/svg/phone.svg'
import PhoneSVG from '../../assets/svg/phone-2.svg'
import HeaderMenu from './HeaderMenu'
import SearchInput from '../SearchInput/SearchInput'
import Link from 'next/link'
import LogoSVG from '../../assets/svg/logo.svg'
import LogoMobileSVG from '../../assets/svg/logo-mobile.svg'
import MenuBurgerOpenSVG from '../../assets/svg/menuBurger.svg'
import MenuBurgerCloseSVG from '../../assets/svg/close-2.svg'

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenMenu = (): void => {
    document.body.classList.toggle('mobile-fixed')
    setOpen((prev) => !prev)
  }

  return (
    <>
      <header className="header">
        <div className='header__wrapper-left'>
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
           {open ? <MenuBurgerCloseSVG width={17} height={14}/> : <MenuBurgerOpenSVG width={17} height={14}/>} 
          </div>
        </div>
        <div className="header__logo">
          <Link href="/">
            <a>
              <div className="header__logo-svg">
                <LogoSVG width={227} height={16}/>
              </div>
              <div className="header__logo-svg--mobile">
                <LogoMobileSVG />
              </div>
            </a>
          </Link>
        </div>
        </div>
        
        <div className="header__search">
          <SearchInput id="header-search" />
        </div>
        <div className="header__contact">
          <a
            href="https://t.me/joinchat/AAAAAD9TKVdDMSjyAzajbA"
            target="_blank"
            rel="noreferrer"
            className='header__contact-mgr'
          >
            <div className="header__contact-item">
              <div className="header__contact-item-icon">
                <TelegramSVG width={10} height={8} />
              </div>
              <div className="header__contact-item-text">Пишіть нам в телеграм</div>
            </div>
          </a>
          <div className="header__contact-item header__contact-mgr">
          <div className="header__contact-item-icon">
                  <PhoneSVG />
                </div>
          <div>
            <a href="tel:0683288818"><span className='header__contact-item-text'>068 328 88 18</span></a>
            <a href="tel:0443343869"><span className='header__contact-item-text'>044 334 38 69</span></a>
          </div>
        </div>
          <Link href="/consult">
            <a>
              <div className="header__contact-item header__contact-call">
                <div className="header__contact-item-text">Замовити дзвінок</div>
              </div>
              <div className="header__contact-mob header__contact-call">
                <div className="header__contact-mob-text">Замовити дзвінок</div>
              </div>
            </a>
          </Link>
        </div>
      </header>
      <HeaderMenu open={open} setOpen={handleOpenMenu} />
    </>
  )
}

export default Header
