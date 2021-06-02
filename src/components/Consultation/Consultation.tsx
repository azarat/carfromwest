import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Consultation: React.FC = () => {
  return (
    <div className="consultation__wrapper">
      <div className="consultation">
        <h3 className="consultation__title">
          Есть вопросы или что-то не поняли? Звоните и мы ответим на них!
        </h3>
        <Link href="/check">
          <a>
            <button className="consultation__btn">получить консультацию</button>
          </a>
        </Link>
        <div className="consultation__image-wrapper">
          <div className="consultation__image-inner">
            <Image
              src="/assets/images/consultationCar.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consultation
