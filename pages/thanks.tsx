import { NextPage } from 'next'
import React from 'react'
import SocialLink from '../src/components/SocialLink/SocialLink'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Thanks: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ga('set', 'page', location.pathname + location.search)
      ga('send', 'pageview')
    }
    if (typeof document !== 'undefined') {
      document.body.scrollIntoView()
    }
  }, [])

  return (
    <div className="thanks">
      <div className="thanks__wrapper">
        <h1 className="thanks__title">благодарим вас за заявку</h1>
        <p className="thanks__subtitle">
          Наш менеджер свяжется с вами в ближайшее время!
        </p>
        <button
          className="thanks__btn"
          onClick={() => router.push({ pathname: '/' })}
        >
          на главную
        </button>
        <div className="thanks__contacts">
          <p className="thanks__contacts-title">Cвяжитесь с нами</p>
          <a className="thanks__contacts-phone" href="tel:0800215804">
            0 800 215 804
          </a>
          <SocialLink />
        </div>
      </div>
      <div className="thanks__img"></div>
    </div>
  )
}

export default Thanks
