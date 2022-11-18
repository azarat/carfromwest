import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TriangleSVG from '../../assets/svg/consultTriangle.svg'

const Consultation: React.FC = () => {
  return (
    <div className="consultation__wrapper">
      <div className="consultation">
        <TriangleSVG className="consultation__svg consultation__svg--first" />
        <TriangleSVG className="consultation__svg consultation__svg--second" />
        <div className="consultation__inner">
          <h3 className="consultation__title">Остались вопросы?:)</h3>
          <p className="consultation__text">
            Жмите <span>«получить консультацию»</span> и наши эксперты ответят
            на все!
          </p>
          <Link href="/consult">
            <a>
              <button className="consultation__btn">
                получить консультацию
              </button>
            </a>
          </Link>
        </div>
        <div className="consultation__image-wrapper">
          <div className="consultation__image-inner">
            <Image
              src="/assets/images/consultation.png"
              layout="fill"
              objectFit="contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consultation
