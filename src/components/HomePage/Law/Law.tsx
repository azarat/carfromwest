import React from 'react'
import Image from 'next/image'

const Law: React.FC = () => {
  return (
    <section id="section-law" className="law">
      <div className="law__container">
      <div className="law__text">
        <h2 className='law__title'>ТЕПЕР АВТО З США ЩЕ ВИГІДНІШЕ!</h2>
        <div className="law__description">
          <p>В Україні діє закон про безкоштовне розмитнення транспортних засобів.</p>
          <p>
            20% ПДВ для імпорту легкових та вантажних автомобілів, а також мотоциклів, автобусів та кузовів скасовано для всіх. А фізичні особи не платять мито (7%) та акциз.
          </p>
        </div>
      </div>
      <div className="law__image">
        <Image
          className="law__image-block"
          src="/assets/images/law.jpg"
          layout="fill"
        />
      </div>
      </div>
    </section>
  )
}

export default Law
