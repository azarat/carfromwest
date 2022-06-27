import React from 'react'
// import Image from 'next/image'
import { Formik } from 'formik'
// import InputMask from 'react-input-mask'
import { useRouter } from 'next/router'

const numberRegEpx = /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/

const RequestBottom: React.FC = () => {
  const router = useRouter()

  const sendRequest = async (values: any): Promise<void> => {
    const res = await fetch(
      'https://admin.webrains.studio/sendCFWLandingMessage',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          initialLink: sessionStorage
            ? sessionStorage.getItem('initialLink')
            : false,
        }),
      }
    )
    if (res) {
      await router.push('/thanks')
    }
  }

  return (
    <section className="requestBottom">
      <div className="requestBottom__info">
        <div className="requestBottom__info__text">
        <h2 className='requestBottom__info-title'>АВТО “ПІД КЛЮЧ” З АУКЦІОНІВ ІЗ США</h2>
        <div className="requestBottom__info-description">
            Заповніть форму, аби ми зв`язались з Вами та підібрали автомобіль, який ми можемо привезти із США для вас з економією в 40%.
        </div>
        </div>
        <Formik
          initialValues={{ name: '', phone: '', wishes: '' }}
          validate={(values) => {
            const errors: any = {}
            if (!values.name) {
              errors.name = 'Обязательное поле'
            }
            if (!values.phone) {
              errors.phone = 'Обязательное поле'
            } else if (!numberRegEpx.test(values.phone)) {
              errors.phone = 'Не правильно введен номер'
            }
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            sendRequest(values)
            resetForm({})
          }}
        >
          {/* {({ values, touched, handleSubmit, handleChange, errors }) => (*/}
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="requestBottom__info-form">
              {/* <div className="request__info-form-input--wrapper">
                <input
                  name="name"
                  id="request-name"
                  type="text"
                  className="request__info-form-input"
                  value={values.name}
                  onChange={handleChange}
                />
                {values.name.length === 0 && (
                  <label htmlFor="request-name">Введите ваше имя</label>
                )}
                {errors.name && touched.name && (
                  <p className="request__info-form-input-error">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="request__info-form-input--wrapper">
                <InputMask
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  className="request__info-form-input"
                  mask="+380\(99) 999-99-99"
                  alwaysShowMask
                />
                {errors.phone && touched.phone && (
                  <p className="request__info-form-input-error">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="request__info-form-input--wrapper request__info-form-textarea--wrapper">
                <textarea
                  name="wishes"
                  id="request-text"
                  className="request__info-form-textarea"
                  value={values.wishes}
                  onChange={handleChange}
                />
                {values.wishes.length === 0 && (
                  <label htmlFor="request-text">Введите ваши пожелания</label>
                )}
              </div> */}

              <div className="requestBottom__info-form-field-wrapper">
              <label className="requestBottom__info-form-field"
            ><span className="requestBottom__info-form-field__label">Ваше ім’я</span>
            <span className="requestBottom__info-form-field__thumb">
              <input className="requestBottom__info-form-field__input" type="text" name="username" required placeholder='Олександр' />
            </span>
          </label>
          <label className="requestBottom__info-form-field"
            ><span className="requestBottom__info-form-field__label">Номер телефону</span>
            <span className="requestBottom__info-form-field__thumb">
              <input className="requestBottom__info-form-field__input" type="text" name="username" required placeholder='+380 (__) __ __ __'/>
            </span>
          </label>
          <label className="requestBottom__info-form-field form-field--textarea"
            ><span className="requestBottom__info-form-field__label">Коментар:</span>
            <textarea className="requestBottom__info-form-field__textarea" name="comment" placeholder="Введіть Ваші побажання"></textarea>
          </label>
          </div>
              <button className="requestBottom__info-form-button" type="submit">
                Підібрати краще авто
              </button>
            </form>
          )}
        </Formik>
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
