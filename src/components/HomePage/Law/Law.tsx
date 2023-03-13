import React from 'react'
import Image from 'next/image'

const Law: React.FC = () => {
  return (
    <section id="section-law" className="law">
      <div className="law__container">
        <div className="law__text">
          <h2 className="law__title">ТЕПЕР АВТО З США ЩЕ ВИГІДНІШЕ!</h2>
          <div className="law__description">
            <p>
              В Україні діє закон про{' '}
              <span className="law__description-bold">
                безкоштовне розмитнення електромобілів.
              </span>{' '}
              І цей закон не планують відміняти!{' '}
            </p>
            <p>Вигідне авто з США і ніяких проблем з пошуками палива!</p>
          </div>
        </div>
        <div className="law__image-desc">
          <Image
            className="law__image-desc-block"
            src="/assets/images/lawM-min.png"
            layout="fill"
            loading="eager"
          />

          {/* <div className="law__image-tab"><Image
          className="law__image-block"
          src="/assets/images/lawM.png"
          layout="fill"
        /></div>
        <div className="law__image-mob"><Image
          className="law__image-block"
          src="/assets/images/lawM.png"
          layout="fill"
        /></div> */}
        </div>
        <div className="law__image-mob">
          <img
            className="law__image-mob-block"
            src="/assets/images/lawM-min.png"
            alt="image"
          />
        </div>
      </div>
    </section>
  )
}

export default Law
