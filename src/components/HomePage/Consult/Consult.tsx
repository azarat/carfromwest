import Link from 'next/link'
import React from 'react'
import ClickSVG from '../../../assets/svg/click.svg'
import ConsultGallery from './ConsultGallery'

const Consult: React.FC = () => {
  return (
    <div className="consult">
      <div className="consult__wrapper">
        <div className="consult__inner">
          <h2 className="consult__title">
            <span>С нами</span> пригнать АВТО из США гораздо{' '}
            <span>безопаснее</span>, чем с "соседом", компанией однодневкой,
            перекупом и тд..
          </h2>
          <p className="consult__text">
            Узнайте наши условия, спросите нашего менеджера, что входит в наши
            услуги! Мы уже максимально компетентны в этом бизнесе, с нами
            надёжно!
          </p>
          <div className="consult__click">
            <p className="consult__click-text">Нажимайте</p>
            <ClickSVG />
          </div>
          <Link href="/consult">
            <a>
              <button className="consult__btn">хочу консультацию</button>
            </a>
          </Link>
        </div>
        <ConsultGallery />
      </div>
    </div>
  )
}

export default Consult
