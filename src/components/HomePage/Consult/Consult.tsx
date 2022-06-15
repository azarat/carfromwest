import Link from 'next/link'
import React from 'react'
import ConsultGallery from './ConsultGallery'

const Consult: React.FC = () => {
  return (
    <div className="consult">
      <div className="consult__wrapper">
        <div className="consult__inner">
          <h2 className="consult__title">
          З нами пригнати АВТО з США набагато безпечніше, ніж з "сусідом", компанією одноденкою, перекупом тощо.
          </h2>
          <p className="consult__text">
            Цікавлять умови? Етапи роботи, строки або гарантії? 
            Отримайте консультацію вже зараз!
          </p>
          <Link href="/consult">
            <a>
              <button className="consult__btn">Хочу консультацію</button>
            </a>
          </Link>
        </div>
        <ConsultGallery />
      </div>
    </div>
  )
}

export default Consult
