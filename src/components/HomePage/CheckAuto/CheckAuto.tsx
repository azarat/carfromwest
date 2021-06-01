import React from 'react'

const CheckAuto: React.FC = () => {
  return (
    <div className="check">
      <div className="check__wrapper">
        <h2 className="check__title">
          Уже присмотрели себе авто с другой компанией?
        </h2>
        <p className="check__text">
          Свяжитесь с нами! Мы проверим ваш автомобиль в качестве независимых
          экспертов. Так вы на 100% защитите себя от обмана и покупки
          некачественного автомобиля
        </p>
        <button className="check__btn">проверить авто</button>
      </div>
      <div className="check__img" />
    </div>
  )
}

export default CheckAuto
