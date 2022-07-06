import { NextPage } from 'next'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import InputMask from 'react-input-mask'
import Link from 'next/link'

// const numberRegEpx = /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/

const Order: NextPage = () => {
  const [connectType, setConnectType] = useState<string>('tel')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const [autoVin, setAutoVin] = useState<any>()
  const [isFormSend, setIsFormSend] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    setAutoVin(localStorage.getItem("autoVin"))
  }, [autoVin])
  const handleSend: MouseEventHandler = async (e) => {
    const url = localStorage.getItem('url')
    e.preventDefault()
    if (validate().length == 0) {

      const data = {
        title: 'Форма: Нове замовлення',
        name,
        phone,
        link: url,
        type: connectType,
        initialLink: localStorage
          ? localStorage.getItem('url')
          : false,
      };

      const JSONdata = JSON.stringify(data)

      const endpoint = '/api/tg_bot'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata
      }

      const response = await fetch(endpoint, options)

      const result = await response.json()

      // console.log(result);

      if (result.status === 200) {
        setName('')
        setPhone('')
        // localStorage.removeItem('url')
        setIsFormSend(true)
      }
    }
  }

  const validate = (): string[] => {
    const initErrors: string[] = []
    if (name.length < 2) initErrors.push('name')
    // if (!numberRegEpx.test(phone)) initErrors.push('phone')
    setErrors([...initErrors])
    return initErrors
  }

  return (
    <div className="order">
      
      <div className="order__wrapper">
        <div className="containers">
          <nav className="car-page__breadcrumbs order-sec">
            <ul>
              <li  className="car-page__breadcrumbs-link order-sec">
                <Link href="/">
                  <a>
                    Головна →
                  </a>
                </Link>
               
              </li>
              <li className="car-page__breadcrumbs-link order-sec">
                <Link href="/catalog">
                  <a>
                    Каталог авто →
                  </a>
                </Link>
                
              </li>
              <li className="car-page__breadcrumbs-link order-sec">
                 <a onClick={() => router.back()}>
                      {autoVin} →</a>
                   </li>
                <li className="car-page__breadcrumbs-link order-sec">
                <Link href="/order">
                  <a>
                    Форма
                  </a>
                </Link></li>
            </ul>
          </nav>
          </div>
        
       {isFormSend ? <form className="order__form">
        <h1 className="order__title-thanks">ДЯКУЄМО
        ЗА ЗАЯВКУ<span className='order__form-title'>!</span></h1>
        <p className='order__text'>Наш менеджер зв’яжеться з Вами в найближчий час</p>
        <button className="order__form-btn" >
        <Link href="/">
                  <a>
                    На головну 
                  </a>
                </Link>
          </button>
      </form>
        : 
      <form className="order__form">
      <h1 className="order__title"><span className='order__form__line-start'></span>ПОРАХУВАТИ ВАРТІСТЬ<span className='order__form__line-end'></span></h1>
      <div className="order__form__input-wrapper">
        <span className="order__form__thumb">
          <input 
          className={`order__form-input ${
          errors.includes('name') ? 'order__form-input--error' : ''
          }`}
          placeholder="Ваше ім’я"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </span>
        <span className="order__form__thumb">
          <input
          // alwaysShowMask
          type="text"
          className={`order__form-input ${
            errors.includes('phone') ? 'order__form-input--error' : ''
          }`}
          placeholder="Номер телефону"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
        </span>
      </div>
      <div className="order__form-checkbox-wrappers">
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
            Консультація по телефону
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
            Відправити інформацію в Вайбер/Телеграм
          </label>
        </div>
      </div>
      <button className="order__form-btn" onClick={handleSend}>
        Відправити
      </button>
    </form> 
      } 
      
      </div>
    </div>
  )
}

export default Order
