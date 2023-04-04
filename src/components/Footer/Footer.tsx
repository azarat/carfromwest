import Link from 'next/link'
import React from 'react'
import SocialLink from '../SocialLink/SocialLink'
import LogoSVG from '../../assets/svg/logo.svg'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <Link href="/">
            <a>
              <LogoSVG />
            </a>
          </Link>
        </div>
        <div className="footer__contacts">
          <h4 className="footer__contacts-title">Контакти</h4>
          <ul className="footer__contacts-list">
            <li className="footer__contacts-item">
              <a href="tel:0443343869">(044) 334-38-69</a>
            </li>
            <li className="footer__contacts-item">
              <a href="tel:0683288818">+380 68 328 8818</a>
            </li>
            <li className="footer__contacts-item">
              <a href="tel:0800215804">0800 215 804</a>
            </li>
          </ul>

          <div className="footer__contacts-address">
            <p>
              <a
                href="https://goo.gl/maps/Ahc6Nndy4vtpVXcB6"
                target="_blank"
                rel="noopener noreferrer"
              >
                м. Київ, пр. Коломіївський, 20
              </a>
            </p>
          </div>
          {/* <div className="footer__contacts-address">
            <p>
              <a
                href="https://goo.gl/maps/2dmLtzjUyiyGTom26"
                target="_blank"
                rel="noopener noreferrer"
              >
                м. Харків, пл. Павлівська, 10
              </a>
            </p>
          </div> */}
        </div>
        <div className="footer__work-time">
          <h4 className="footer__work-time-title">Графік роботи </h4>
          <p className="footer__work-time-date">24/7/365</p>
        </div>
        <SocialLink />
      </div>
    </footer>
  )
}

export default Footer
