import { useFormik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import InputMask from 'react-input-mask'
import * as Yup from 'yup'

const fbValidationSchema = {
  phone: Yup.string().min(13).required('Поле обязательное'),
}

const ConsultForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: Yup.object().shape(fbValidationSchema),
    onSubmit: (values) => {
      fetch(`https://admin.webrains.studio/sendCFWLandingMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: values.name, phone: values.phone }),
      }).then(
        (res) =>
          res.status === 200 &&
          typeof window !== 'undefined' &&
          window.location.assign('/thanks')
      )
    },
  })

  useEffect(() => {
    document.querySelector('.header')?.classList.add('header--none')
    return () => {
      document.querySelector('.header')?.classList.remove('header--none')
    }
  }, [])

  return (
    <div className="consult-form-wrapper">
      <div className="consult-form">
        <h1 className="consult-form-title">Заполните форму</h1>
        <h3 className="consult-form-subtitle">
          С вами свяжется менеджер, уточнит все детали и начнет поиск авто для
          вас
        </h3>
        <input
          className="consult-form-input"
          type="text"
          name="name"
          placeholder="Имя"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <InputMask
          alwaysShowMask
          maskChar=""
          className={`consult-form-input ${
            formik.errors.phone ? 'consult-form-input-error' : ''
          }`}
          type="text"
          name="phone"
          value={formik.values.phone}
          mask="+380999999999"
          onChange={formik.handleChange}
        ></InputMask>
        <button className="consult-form-button" onClick={formik.submitForm}>
          начать поиск
        </button>
      </div>
    </div>
  )
}

export default ConsultForm
