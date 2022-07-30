import { NextPage } from 'next'
import React, { MouseEventHandler, useState } from 'react'
// import InputMask from 'react-input-mask'
import router from 'next/router'

// const numberRegEpx = /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/

const Check: NextPage = () => {
  const [wishes, setWishes] = useState<string>('')
  const [connectType, setConnectType] = useState<string>('tel')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  // const [isFormSend, setIsFormSend] = useState<boolean>(true)
  // const router = useRouter()

  const handleSend: MouseEventHandler = async (e) => {
    e.preventDefault()
    if (validate().length == 0) {

      const data = {
        title: 'Форма: Перевірити авто',
        name,
        phone,
        wishes,
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

      // const result = await response.json()

      // console.log(result);

      if (response.status === 200) {
        setName('')
        setPhone('')
        localStorage.removeItem('url')
        // setIsFormSend(true)
        router.push('/thankyou')
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
        
        
      <form className="order__form order__form" style={{marginTop: "5%"}}>
      <h1 className="order__title"><span className='order__form__line-start'></span>Перевірити авто<span style={{width: "50%", marginLeft: "10px"}} className='order__form__line-end'></span></h1>
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
        <span className="order__form__thumb">
            <textarea
              name="wishes"
              className="order__form-input"
              placeholder='Коментар'
              value={wishes as string}
              onChange={(e) => setWishes(e.target.value)}
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
      </div>
    </div>
  )
}

export default Check
