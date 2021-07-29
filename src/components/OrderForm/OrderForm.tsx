import { useRouter } from 'next/router'
import React, { MouseEventHandler, useState } from 'react'
import InputMask from 'react-input-mask'
import ArrowBackSVG from '../../assets/svg/arrowBack.svg'

const numberRegEpx = /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/

const OrderForm: React.FC = () => {
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
            initialLink: sessionStorage
              ? sessionStorage.getItem('initialLink')
              : false,
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
    <div className="order-form">
      <div className="order-form__wrapper">
        <ArrowBackSVG
          className="order-form__back"
          onClick={() => router.push('/catalog')}
        />
        <div className="order-form__title-wrapper">
          <h1 className="order-form__title">Этот лот уже продан:)</h1>
          <h3 className="order-form__subtitle">
            Напишите пожалуйста Ваш телефон, менеджер подберёт для Вас что-то
            аналогичное или то, что захотите
          </h3>
        </div>
        <form className="order-form__form">
          <input
            type="text"
            className={`order-form__form-input ${
              errors.includes('name') ? 'order-form__form-input--error' : ''
            }`}
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputMask
            mask="+380\(99) 999-99-99"
            alwaysShowMask
            type="text"
            className={`order-form__form-input ${
              errors.includes('phone') ? 'order-form__form-input--error' : ''
            }`}
            placeholder="Ваш телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="order-form__form-textarea-wrapper">
            <textarea
              name="wishes"
              className="order-form__form-textarea"
              value={wishes as string}
              onChange={(e) => setWishes(e.target.value)}
            />
            {wishes?.length === 0 && (
              <label
                className="order-form__form-textarea-label"
                htmlFor="wishes"
              >
                Комментарий
              </label>
            )}
          </div>
          <h3 className="order-form__form-connect-title">
            Удобный способ связи:
          </h3>
          <div className="order-form__form-checkbox-wrapper">
            <input
              id="tel"
              name="tel"
              type="checkbox"
              className="order-form__form-checkbox"
              onChange={() => setConnectType('tel')}
              checked={connectType === 'tel'}
            />
            <label className="order-form__form-label" htmlFor="tel">
              Звонок по телефону
            </label>
          </div>
          <div className="order-form__form-checkbox-wrapper">
            <input
              type="checkbox"
              id="messanger"
              name="messanger"
              className="order-form__form-checkbox"
              onChange={() => setConnectType('messanger')}
              checked={connectType === 'messanger'}
            />
            <label className="order-form__form-label" htmlFor="messanger">
              <span>Сообщение в Вайбер/Телеграм</span>
            </label>
          </div>
          <button className="order-form__form-btn" onClick={handleSend}>
            отправить
          </button>
        </form>
      </div>
    </div>
  )
}

export default OrderForm
