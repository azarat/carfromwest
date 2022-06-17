import React/*  { useState } */ from 'react'
import Image from 'next/image'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];


// import AutoSearch from './AutoSearch'
// import ArrowLinkSVG from '../../../assets/svg/right-arrow-link.svg'
// import { useRouter } from 'next/router'

const Promo: React.FC = (): JSX.Element => {
  // const [open] = useState(false)
  // const router = useRouter()


  // const handleFormOpen = (): void => {
  //   router.push('/selection')
  // }

  return (
    <>
      <div className="promo">
        {/* <div className="promo__bg">
          <Image
            objectFit="cover"
            layout="fill"
            src="/assets/images/promo-bg.jpeg"
          />
        </div> */}
        {/* <div className="promo__filter">
          <AutoSearch isFormOpen={open} handleFormOpen={handleFormOpen} />
        </div> */}
        <div className="promo__wrapper">
        <div className="promo__wrapper-left">
          <h1 className="promo__title">
            АВТО ІЗ США
          </h1>
          <p className="promo__description">
            Бажаєте підібрати найкращий варіант та цікавитесь як заощадити при покупці авто з США?
            Залиште номер телефону і ми розповімо усі подробиці!
          </p>
          <form className="promo__form" action="">
            <div className="promo__form__discount">Економія до 40%</div>
            <div className="promo__form-left">
              <Select options={options} placeholder={"Марка"}
              className={`promo__form-left__select`}/>
              <Select options={options} placeholder={'Модель'}
              className={`promo__form-left__select`} />
            </div>
            <div className="promo__form-right">
              <div className="promo__form-right-info">
                <span className={`promo__form-right__select-year`}>Рік</span>
                <Select options={options} placeholder={'Від'}
                className={`promo__form-right__select`} />
                <Select options={options} placeholder={'До'}
                className={`promo__form-right__select`}/>
              </div>
              <div className="promo__form-right-info">
              <span className={`promo__form-right__select-price`}>Ціна</span>
                <Select options={options} placeholder={'Від'}
                className={`promo__form-right__select`} />
                <Select options={options} placeholder={'До'}
                className={`promo__form-right__select`}/>
              </div>
            </div>
            <button className="promo__form__btn" type='button'>Пошук</button>
          </form>
          </div>
          <div className="promo__wrapper-right">
            <div className='promo__wrapper-right-blue'></div>
            <div className='promo__wrapper-right-orange'></div>
            <div className='promo__wrapper-right-red'></div>
            <div className="promo__image">
            <Image className='promo__image-block'
              objectFit="cover"
              layout="fill"
              src="/assets/images/hero_1.jpg"
            />
          </div>
        </div>
          {/* <div
            role="presentation"
            className="promo__video"
          >
            <div className="promo__video-image">
              <span className="promo__video-play-button" />
            </div>
            <div className="promo__video-link">
              <ArrowLinkSVG />
              <button onClick={handleFormOpen} className="promo__button">
                Подобрать авто
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Promo
