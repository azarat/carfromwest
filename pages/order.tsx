import { NextPage } from 'next'
import React, { MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/router'
import InputMask from 'react-input-mask'
import ArrowBackSVG from '../src/assets/svg/arrowBack.svg'

const numberRegEpx = /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/

const Order: NextPage = () => {
  const [connectType, setConnectType] = useState<string>('tel')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const router = useRouter()

  const handleSend: MouseEventHandler = async (e) => {
    const url = localStorage.getItem('url')
    e.preventDefault()
    if (validate().length == 0) {
      const res = await fetch(
        'https://admin.webrains.studio/sendCFWLandingMessage',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            link: url,
            type: connectType,
          }),
        }
      )
      if (res.status === 200) {
        setName('')
        setPhone('')
        localStorage.removeItem('url')
        router.push({ pathname: '/thanks' })
      }
    }
  }

  const validate = (): string[] => {
    const initErrors: string[] = []
    if (name.length < 2) initErrors.push('name')
    if (!numberRegEpx.test(phone)) initErrors.push('phone')
    setErrors([...initErrors])
    return initErrors
  }

  return (
    <div className="order">
      <div className="order__wrapper">
        <ArrowBackSVG className="order__back" onClick={() => router.back()} />
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
          <InputMask
            mask="+380\(99) 999-99-99"
            alwaysShowMask
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
