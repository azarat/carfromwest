import { NextPage } from 'next'
import React, { MouseEventHandler, useState } from 'react'
// import InputMask from 'react-input-mask'
import Link from 'next/link'

// const numberRegEpx = /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/

const Check: NextPage = () => {
  const [wishes, setWishes] = useState<string>('')
  const [connectType, setConnectType] = useState<string>('tel')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const [isFormSend, setIsFormSend] = useState<boolean>(false)
  // const router = useRouter()

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
      <form className="order__form order__form" style={{marginTop: "5%"}}>
      <h1 className="order__title"><span className='order__form__line-start'></span>Отримати консультацію<span style={{width: "5%", marginLeft: "3px"}} className='order__form__line-end'></span></h1>
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
      } 
      
      </div>
    </div>
  )
}

export default Check
