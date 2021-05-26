import { NextPage } from 'next'
import React, { MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/router'

const Order: NextPage = () => {
  const [connectType, setConnectType] = useState<string>('tel')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const rouster = useRouter()

  const handleSend: MouseEventHandler = async (e) => {
    e.preventDefault()
    if (validate().length == 0) {
      console.log(name, phone, connectType)
      setName('')
      setPhone('')
    }
  }

  const validate = () => {
    const initErrors: string[] = []
    if (name.length < 2) initErrors.push('name')
    if (phone.length < 10) initErrors.push('phone')
    setErrors([...initErrors])
    rouster.push({ pathname: '/thanks/' })
    return initErrors
  }

  return (
    <div className="order">
      <div className="order__wrapper">
        <h1 className="order__title">посчитать стоимость</h1>
        <form className="order__form">
          <input
            type="text"
            className={`order__form-input ${
              errors.includes('name') ? 'order__form-input--error' : ''
            }`}
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className={`order__form-input ${
              errors.includes('phone') ? 'order__form-input--error' : ''
            }`}
            placeholder="Ваш телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="order__form-checkbox-wrapper">
            <input
              id="tel"
              name="tel"
              type="checkbox"
              className="order__form-checkbox"
              onChange={() => setConnectType('tel')}
              checked={connectType === 'tel'}
            />
            <label className="order__form-label" htmlFor="tel">
              Консультация по телефону
            </label>
          </div>
          <div className="order__form-checkbox-wrapper">
            <input
              type="checkbox"
              id="messanger"
              name="messanger"
              className="order__form-checkbox"
              onChange={() => setConnectType('messanger')}
              checked={connectType === 'messanger'}
            />
            <label className="order__form-label" htmlFor="messanger">
              Отправить информацию в Вайбер/Телеграм
            </label>
          </div>
          <button className="order__form-btn" onClick={handleSend}>
            отправить
          </button>
        </form>
      </div>
      <div className="order__img"></div>
    </div>
  )
}

export default Order
