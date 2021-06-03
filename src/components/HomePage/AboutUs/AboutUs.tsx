import React from 'react'
import Image from 'next/image'
import SubTitle from '../../SubTitle/SubTitle'
import Title from '../../Title/Title'

const AboutUs: React.FC = () => {
  return (
    <section id="section-about" className="about-us">
      <div className="about-us__text">
        <SubTitle>Наши достижения</SubTitle>
        <Title>О НАШЕЙ КОМПАНИИ</Title>
        <div className="about-us__description">
          <p>Уже 5 лет наша компания является дилером автомобилей из США.</p>
          <p>
            Мы организовываем весь процесс привоза автомобиля из США, от
            профессионального выбора, до ремонта и постановки на номера! Найдем
            любой автомобиль , под любой вкус наших клиентов!
          </p>
        </div>
        <div className="about-us__stats">
          <div className="about-us__stats-auto">
            <div className="about-us__stats-number">5000+</div>
            <p className="about-us__stats-text">Привезено автомобилей</p>
          </div>
          <div className="about-us__stats-year">
            <div className="about-us__stats-number">5 лет</div>
            <p className="about-us__stats-text">На рынке Украины</p>
          </div>
          <div className="about-us__stats-money">
            <div className="about-us__stats-number">20565000 $</div>
            <p className="about-us__stats-text">Сэкономлено денег клиентами</p>
          </div>
        </div>
      </div>
      <div className="about-us__image">
        <h4 className="about-us__image-title">5000+</h4>
        <h5 className="about-us__image-sub-title">Машин</h5>
        <Image
          className="about-us__image-block"
          src="/assets/images/about-us-auto.png"
          layout="fill"
        />
      </div>
    </section>
  )
}

export default AboutUs
