import Link from 'next/link'
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
          Зв'яжіться з нами! Ми перевіримо ваш автомобіль як незалежних експертів. Так ви на 100% захистите себе від обману та покупки неякісного автомобіля
        </p>
        <Link href="/check">
          <a>
            <button className="check__btn">Перевірити авто</button>
          </a>
        </Link>
      </div>
      <div className="check__img" />
      </div>
    </div>
  )
}

export default CheckAuto
