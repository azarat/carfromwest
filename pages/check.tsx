import { NextPage } from 'next'
import React, { MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/router'
import InputMask from 'react-input-mask'
import ArrowBackSVG from '../src/assets/svg/arrowBack.svg'

const numberRegEpx = /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/

const Check: NextPage = () => {
  const [connectType, setConnectType] = useState<string>('tel')
  const [name, setName] = useState<string>('')
  const [wishes, setWishes] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const router = useRouter()

  const handleSend: MouseEventHandler = async (e) => {
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
            wishes,
            type: connectType,
          }),
        }
      )

      if (res.status === 200) {
        setName('')
        setPhone('')
        localStorage.removeItem('url')
        router.push({ pathname: '/' })
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
    <div className="check-auto">
      <div className="check-auto__wrapper">
        <ArrowBackSVG className="check__back" onClick={() => router.back()} />
        <h1 className="check-auto__title">проверить авто</h1>
        <form className="check-auto__form">
          <input
            type="text"
            className={`check-auto__form-input ${
              errors.includes('name') ? 'check-auto__form-input--error' : ''
            }`}
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputMask
            mask="+380\(99) 999-99-99"
            alwaysShowMask
            type="text"
            className={`check-auto__form-input ${
              errors.includes('phone') ? 'check-auto__form-input--error' : ''
            }`}
            placeholder="Ваш телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="check-auto__form-textarea-wrapper">
            <textarea
              name="wishes"
              className="check-auto__form-textarea"
              value={wishes as string}
              onChange={(e) => setWishes(e.target.value)}
            />
            {wishes?.length === 0 && (
              <label
                className="check-auto__form-textarea-label"
                htmlFor="wishes"
              >
                Комментарий
              </label>
            )}
          </div>
          <div className="check-auto__form-checkbox-wrapper">
            <input
              id="tel"
              name="tel"
              type="checkbox"
              className="check-auto__form-checkbox"
              onChange={() => setConnectType('tel')}
              checked={connectType === 'tel'}
            />
            <label className="check-auto__form-label" htmlFor="tel">
              Консультация по телефону
            </label>
          </div>
          <div className="check-auto__form-checkbox-wrapper">
            <input
              type="checkbox"
              id="messanger"
              name="messanger"
              className="check-auto__form-checkbox"
              onChange={() => setConnectType('messanger')}
              checked={connectType === 'messanger'}
            />
            <label className="check-auto__form-label" htmlFor="messanger">
              <span>Отправить информацию в Вайбер/Телеграм</span>
            </label>
          </div>
          <button className="check-auto__form-btn" onClick={handleSend}>
            отправить
          </button>
        </form>
      </div>
      <div className="check-auto__img" />
    </div>
  )
}

export default Check
