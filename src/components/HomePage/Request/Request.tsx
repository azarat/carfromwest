import React from 'react'
import InputMask from 'react-input-mask'
import SubTitle from '../../SubTitle/SubTitle'
import Title from '../../Title/Title'

const Request: React.FC = () => {
  return (
    <section className="request">
      <div className="request__info">
        <SubTitle>Оставьте заявку</SubTitle>
        <Title>АВТО “ПОД КЛЮЧ” С АУКЦИОНОВ ИЗ США</Title>
        <div className="request__info-description">
          Заполните форму, чтобы мы связались с вами и сказали какой автомобиль
          вы можете себе пригнать из США, сэкономив до 40% его стоимости.
        </div>
        <form className="request__info-form">
          <input type="text" className="request__info-form-input" />
          <InputMask mask="+380\(99) 999-99-99" maskChar="_" alwaysShowMask />
          <textarea />
          <button type="submit">Подобрать лучшее авто</button>
        </form>
      </div>
      <div className="request__image">
        <h4 className="request__image-title">CARSFROMWEST</h4>
      </div>
    </section>
  )
}

export default Request
