import Link from 'next/link'
import React from 'react'
import SocialLink from '../SocialLink/SocialLink'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
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
        <div className="footer__contacts">
          <h4 className="footer__contacts-title">Контакты</h4>
          <ul className="footer__contacts-list">
            <li className="footer__contacts-item">
              <a href="tel:0443343869">(044) 334-38-69</a>
            </li>
            <li className="footer__contacts-item">
              <a href="tel:+380634688818">+380 (63) 468-88-18</a>
            </li>
            <li className="footer__contacts-item">
              <a href="tel:+380979838888">+380 (97) 983-88-88</a>
            </li>
          </ul>

          <div className="footer__contacts-address">
            <p>
              г. Киев, пер. <br /> Коломиевский, 20
            </p>
          </div>
        </div>
        <div className="footer__work-time">
          <h4 className="footer__work-time-title">График работы</h4>
          <p className="footer__work-time-date">24/7/365</p>
        </div>
        <SocialLink />
      </div>
      <div className="footer__copyright">
        <p className="footer__copyright-text">
          © Copyright - Все права защищены 2019.
          <br /> CARSFROMWEST
        </p>
      </div>
    </footer>
  )
}

export default Footer
