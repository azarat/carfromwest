import React from 'react'
import Image from 'next/image'

const Consultation: React.FC = () => {
  return (
    <div className="consultation__wrapper">
      <div className="consultation">
        <h3 className="consultation__title">
          Есть вопросы или что-то не поняли? Звоните и мы ответим на них!
        </h3>
        <button className="consultation__btn"> получить консультацию</button>
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
