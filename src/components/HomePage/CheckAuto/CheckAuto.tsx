import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const CheckAuto: React.FC = () => {
  return (
    <div className="check">
      <div className="check__container">
        <div className="check__wrapper">
          <h2 className="check__title">
            Вже обрали собі авто з іншою компанією?
          </h2>
          <p className="check__text">
            Зв'яжіться з нами! Ми перевіримо ваш автомобіль як незалежних
            експертів. Так ви на 100% захистите себе від обману та покупки
            неякісного автомобіля
          </p>
          <Link href="/check">
            <a>
              <button className="check__btn">Перевірити авто</button>
            </a>
          </Link>
        </div>
        <div className="check__img">
          <div className="check__img-desc">
            <Image
              src="/assets/images/check-xl-min.png"
              layout="fill"
              objectFit="cover"
              loading="eager"
            />
          </div>
          <div className="check__img-tab">
            <Image
              src="/assets/images/check-m-min.png"
              layout="fill"
              objectFit="cover"
              loading="eager"
            />
          </div>
          <div className="check__img-mob">
            <Image
              src="/assets/images/check-s-min.png"
              layout="fill"
              objectFit="cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckAuto
