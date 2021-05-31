import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import SubTitle from '../../SubTitle/SubTitle'
import Title from '../../Title/Title'

const Request: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [phoneValue, setPhoneValue] = useState<string>('')
  const [textAreaValue, setTextAreaValue] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value)
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value)
  }

  return (
    <section className="request">
      <div className="request__info">
        <SubTitle>Оставьте заявку</SubTitle>
        <Title>АВТО “ПОД КЛЮЧ” С АУКЦИОНОВ ИЗ США</Title>
        <div className="request__info-description">
          Заполните форму, чтобы мы связались с Вами и сказали какой автомобиль
          Вы можете себе пригнать из США, сэкономив до 40% его стоимости.
        </div>
        <form className="request__info-form">
          <div className="request__info-form-input--wrapper">
            <input
              id="request-name"
              type="text"
              className="request__info-form-input"
              value={inputValue}
              onChange={handleInputChange}
            />
            {inputValue.length === 0 && (
              <label htmlFor="request-name">Введите ваше имя</label>
            )}
            {inputValue.length === 0 && (
              <p className="request__info-form-input-error">
                Обязательное поле
              </p>
            )}
          </div>
          <div className="request__info-form-input--wrapper">
            <InputMask
              value={phoneValue}
              onChange={handlePhoneChange}
              className="request__info-form-input"
              mask="+380\(99) 999-99-99"
              alwaysShowMask
            />
            {phoneValue.length === 0 && (
              <p className="request__info-form-input-error">
                Обязательное поле
              </p>
            )}
          </div>
          <div className="request__info-form-input--wrapper request__info-form-textarea--wrapper">
            <textarea
              id="request-text"
              className="request__info-form-textarea"
              value={textAreaValue}
              onChange={handleTextAreaChange}
            />
            <label htmlFor="request-text">Введите ваши пожелания</label>
          </div>

          <button className="request__info-form-button" type="submit">
            Подобрать лучшее авто
          </button>
        </form>
      </div>
      <div className="request__image">
        <h4 className="request__image-title">CARSFROMWEST</h4>
        <Image src={'/assets/images/request-nissan.png'} layout="fill" />
      </div>
    </section>
  )
}

export default Request
