import Link from 'next/link'
import Image from 'next/image'
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
          <h4 className="footer__contacts-title">Контакты</h4>
          <ul className="footer__contacts-list">
            <li className="footer__contacts-item">
              <a href="tel:0443343869">(044) 334-38-69</a>
            </li>
            <li className="footer__contacts-item">
              <a href="tel:0800215804">
                0800 215 804<span>(бесплатно по Украине)</span>
              </a>
            </li>
          </ul>

          <div className="footer__contacts-address">
            <p>
              <a
                href="https://goo.gl/maps/Ahc6Nndy4vtpVXcB6"
                target="_blank"
                rel="noopener noreferrer"
              >
                г. Киев, пер. <br /> Коломиевский, 20
              </a>
            </p>
          </div>
          <div className="footer__contacts-address">
            <p>
              <a
                href="https://goo.gl/maps/Ahc6Nndy4vtpVXcB6"
                target="_blank"
                rel="noopener noreferrer"
              >
                г. Харьков, пл. <br /> Павловская, 10
              </a>
            </p>
          </div>
        </div>
        <div className="footer__work-time">
          <h4 className="footer__work-time-title">График работы</h4>
          <p className="footer__work-time-date">24/7/365</p>
        </div>
        <SocialLink />
        <div className="footer__development">
          <a
            href="https://goodpage.studio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="footer__development-image">
              <Image src="/assets/images/gp-logo.png" layout="fill" />
            </div>
            <p className="footer__development-text">
              Сайт разработан GoodPage.studio
            </p>
          </a>
        </div>
      </div>
      <div className="footer__copyright">
        <p className="footer__copyright-text">
          © Copyright - Все права защищены 2021.
          <br /> CARSFROMWEST
        </p>
      </div>
    </footer>
  )
}

export default Footer
