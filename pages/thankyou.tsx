import { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'

const Thankyou: NextPage = () => {

  return (
    <div className="order">
      
      <div className="order__wrapper">
       <form className="order__form">
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
    </div>
  </div>
  )
}

export default Thankyou
