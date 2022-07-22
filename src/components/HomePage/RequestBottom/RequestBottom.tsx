import React, { useState } from 'react'
// import Image from 'next/image'
// import InputMask from 'react-input-mask'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'

// const numberRegEpx = /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/

const RequestBottom: React.FC = () => {
  const [isFormSend, setIsFormSend] = useState<boolean>(false)
  
  const handleSubmit = async (values: any, { resetForm }: any) => {
    const {
      name,
      phone,
      wishes
    } = values;

    const data = {
      title: 'Форма: Підібрати краще авто',
      name,
      phone,
      wishes
    };

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/tg_bot'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata
    }

    const response = await fetch(endpoint, options)
    // const result = await response.json()

    if (response.status === 200) {
      localStorage.removeItem('url')
      setIsFormSend(true)
    }

    resetForm({})
  }
  // const sendRequest = async (values: any): Promise<void> => {
  //   const res = await fetch(
  //     'https://admin.webrains.studio/sendCFWLandingMessage',
  //     {
  //       method: 'POST',

  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...values,
  //         initialLink: sessionStorage
  //           ? sessionStorage.getItem('initialLink')
  //           : false,
  //       }),
  //     }
  //   )
  //   if (res) {
  //     await router.push('/thanks')
  //   }
  // }

  return (
    <section className="requestBottom">
      <div className="requestBottom__info">
        <div className="requestBottom__info__text">
        <h2 className='requestBottom__info-title'>АВТО “ПІД КЛЮЧ” З АУКЦІОНІВ ІЗ США</h2>
        <div className="requestBottom__info-description">
            Заповніть форму, аби ми зв`язались з Вами та підібрали автомобіль, який ми можемо привезти із США для вас з економією в 40%.
        </div>
        </div>
        {isFormSend ? <form className="order__form">
            <h1 className="order__title-thanks">ДЯКУЄМО
            ЗА ЗАЯВКУ<span className='order__form-title'>!</span></h1>
            <p className='order__text'>Наш менеджер зв’яжеться з Вами в найближчий час</p>
            <button className="order__form-btn" onClick={()=>setIsFormSend(false)}>
            <Link href="/">
                      <a>
                        На головну 
                      </a>
                    </Link>
              </button>
          </form>
            : 
          <Formik
            initialValues={{ name: '', phone: '', wishes: '' }}
            validate={(values) => {
              const errors: any = {}
              if (!values.name) {
                errors.name = 'Обязательное поле'
              }
              if (!values.phone) {
                errors.phone = 'Обязательное поле'
              } 
              // else if (!numberRegEpx.test(values.phone)) {
              //   errors.phone = 'Не правильно введен номер'
              // }

              return errors
            }}
            onSubmit={handleSubmit}
          >
          <Form className="requestBottom__info-form">
              <div className="requestBottom__info-form-field-wrapper">
              <label className="requestBottom__info-form-field"
            ><span className="requestBottom__info-form-field__label">Ваше ім’я</span>
            <span className="requestBottom__info-form-field__thumb">
              <Field className="requestBottom__info-form-field__input" type="text" name="name" required placeholder='Олександр' />
            </span>
          </label>
          <label className="requestBottom__info-form-field"
            ><span className="requestBottom__info-form-field__label">Номер телефону</span>
            <span className="requestBottom__info-form-field__thumb">
              <Field className="requestBottom__info-form-field__input" type="text" name="phone" required placeholder='+380 (__) __ __ __'/>
            </span>
          </label>
          <label className="requestBottom__info-form-field form-field--textarea"
            ><span className="requestBottom__info-form-field__label">Коментар:</span>
            <Field name="wishes">
              {({field}: any) => {
                return (
                  <textarea 
                    value={field.value}
                    onChange={field.onChange}
                    name="wishes"
                    className="requestBottom__info-form-field__textarea" 
                    placeholder="Введіть Ваші побажання"></textarea>
                );
              }}
            </Field>
          </label>
          </div>
              <button className="requestBottom__info-form-button" type="submit">
                Підібрати краще авто
              </button>
          </Form>
        </Formik>
        }
      </div>
      {/* <div className="request__image">
        <h4 className="request__image-title">CARSFROMWEST</h4>
        <Image
          src={'/assets/images/request-vag.png'}
          layout="fill"
          objectFit="contain"
        />
      </div> */}
    </section>
  )
}

export default RequestBottom
