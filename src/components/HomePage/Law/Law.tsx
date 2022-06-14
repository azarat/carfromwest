import React from 'react'
import Image from 'next/image'
import Title from '../../Title/Title'

const Law: React.FC = () => {
  return (
    <section id="section-about" className="about-us">
      <div className="about-us__text">
        <Title>ТЕПЕР АВТО З США ЩЕ ВИГІДНІШЕ!</Title>
        <div className="about-us__description">
          <p>В Україні діє закон про безкоштовне розмитнення транспортних засобів.</p>
          <p>
            20% ПДВ для імпорту легкових та вантажних автомобілів, а також мотоциклів, автобусів та кузовів скасовано для всіх. А фізичні особи не платять мито (7%) та акциз.
          </p>
        </div>
      </div>
      <div className="about-us__image">
        <Image
          className="about-us__image-block"
          src="/assets/images/law.jpg"
          layout="fill"
        />
      </div>
    </section>
  )
}

export default Law
