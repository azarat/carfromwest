import React from 'react'
import Image from 'next/image'

const AboutUs: React.FC = () => {
  return (
    <section id="section-about" className="about-us">
      <div className="about-us__text">
        <h2 className='about-us__title'>Про нашу компанію</h2>
        <div className="about-us__description">
          <p className='about-us__description-text'>Наша компанія вже 7 років є надійним дилером автомобілів з США.</p>
          <p>
          Ми організовуємо весь процес привезення автомобіля з США, від професійного вибору, до ремонту та постановки на облік! Знайдемо будь-який автомобіль на будь-який смак наших клієнтів!
          </p>
        </div>
        <div className="about-us__stats">
          <div className="about-us__stats-auto">
            <div className="about-us__stats-number">9000+</div>
            <p className="about-us__stats-text">привезено автомобілів</p>
          </div>
          <div className="about-us__stats-year">
            <div className="about-us__stats-number">7 років</div>
            <p className="about-us__stats-text">на ринку України</p>
          </div>
          <div className="about-us__stats-money">
            <div className="about-us__stats-number">2 країни</div>
            <p className="about-us__stats-text">наші офіси в США та в Україні</p>
          </div>
        </div>
      </div>
      <div className="about-us__image">
        <Image
          className="about-us__image-block"
          src="/assets/images/team-xl.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* <div className="about-us__image-tab">
        <Image
          className="about-us__image-block"
          src="/assets/images/team-m.jpg"
          layout="fill"
        />
      </div>
      <div className="about-us__image-mob">
          <Image
          className="about-us__image-block"
          src="/assets/images/team-s.jpg"
          layout="fill"
        />
      </div> */}
    </section>
  )
}

        

export default AboutUs
