import { useContext, useState } from 'react'
import Image from 'next/image'
import { Field, Form, Formik } from 'formik'
import { IModalValues, IModalContext, IModalErrors } from './Types'
import CrossSVG from '../../../public/assets/images/svg/cross.svg'
import ModalContext from './ModalContext'
import ModalContacts from './ModalContacts'
import LoaderSVG from '../../../public/assets/images/svg/loader.svg'
import TelegramSVG from '../../../public/assets/images/svg/telegram.svg'
import CircleSVG from '../../../public/assets/images/svg/circle.svg'
import { useRouter } from 'next/router'

const Modal: React.FC = (): JSX.Element => {
  const [errors, setErrors] = useState<IModalErrors>({})
  const [isSended, send] = useState<boolean>(false)
  const [isPending, sendRequest] = useState<boolean>(false)
  const { modalVisability, setModalVisability } = useContext<IModalContext>(
    ModalContext
  )

  const router = useRouter()

  const initialValues: IModalValues = { name: '', phone: '', message: '' }
  const handleSubmit = (values: IModalValues) => {
    sendRequest(true)
    const url = 'https://admin.webrains.studio/sendBenjaminMessage'
    const body = router.asPath.match(/(copart|iaai)-\d{1,}$/)
      ? { ...values, url: `https://benjaminauto.com.ua${router.asPath}` }
      : values

    console.log(body)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(() => {
      send(true)
      router.push({
        query: 'thanks',
      })
      if (typeof gtag_report_conversion === 'function')
        return gtag_report_conversion()
    })
  }

  const validate = (values: IModalValues) => {
    const errors: IModalErrors = {}

    if (!values.name) {
      errors.name = 'Обязательное поле'
    } else if (values.name.length < 2) {
      errors.name = 'Длина имени должна быть больше 2 символов'
    }

    if (!values.phone) {
      errors.phone = 'Обязательное поле'
    } else if (values.phone.length < 8) {
      errors.phone = 'Длина номера должна быть больше 8 символов'
    }

    if (!values.message) {
      errors.message = 'Обязательное поле'
    } else if (values.message.length > 200) {
      errors.message = 'Длина поля должна быть не более 200 символов'
    }
    setErrors(errors)
    return errors
  }

  return (
    <div className={`form-modal ${modalVisability ? 'form-modal-open' : ''}`}>
      <button
        className="form-modal-cross"
        onClick={() => {
          send(false)
          sendRequest(false)
          router.push({
            query: '',
          })
          setModalVisability()
        }}
      >
        <CrossSVG />
      </button>
      {!isSended ? (
        <div className="form-modal__car">
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top"
            src="/assets/images/other/modal-car.png"
          />
        </div>
      ) : (
        <div></div>
      )}
      <div className="form-modal__wrapper">
        {!isSended ? (
          <Formik
            validate={validate}
            validateOnChange={false}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnBlur={true}
          >
            <Form className="form-modal__form">
              <h2 className="form-modal__form-header">ЗАКАЗАТЬ ЗВОНОК</h2>
              <div className="form-modal__form-control">
                <label className="form-modal__form-label">ВВЕДИТЕ ИМЯ</label>
                <Field
                  className="form-modal__form-field"
                  placeholder="Имя"
                  name="name"
                />
                <p className="form-modal__form-error">{errors?.name || ''}</p>
              </div>
              <div className="form-modal__form-control">
                <label className="form-modal__form-label">
                  ВВЕДИТЕ НОМЕР ТЕЛЕФОНА
                </label>
                <Field
                  className="form-modal__form-field"
                  name="phone"
                  placeholder="+38"
                />
                <p className="form-modal__form-error">{errors?.phone || ''}</p>
              </div>
              <div className="form-modal__form-control">
                <label className="form-modal__form-label">
                  ВВЕДИТЕ СООБЩЕНИЕ
                </label>
                <Field
                  className="form-modal__form-field"
                  as="textarea"
                  placeholder="Укажите марку, модель и желаемую сумму "
                  name="message"
                />
                <p className="form-modal__form-error">
                  {errors?.message || ''}
                </p>
              </div>
              <button
                disabled={isPending}
                className="form-modal__form-button"
                type="submit"
              >
                {!isPending ? 'Отправить' : <LoaderSVG />}
              </button>
              <ModalContacts />
            </Form>
          </Formik>
        ) : (
          <div className="form-modal-thanks">
            <div className="form-modal-thanks-wrapper">
              <h2 className="form-modal__form-header">
                БЛАГОДАРИМ ВАС ЗА ЗАЯВКУ!
                <br /> Наш менеджер свяжется с вами в ближайшее время!
              </h2>
              <div className="form-modal-thanks-image">
                <Image
                  layout="fill"
                  objectFit="contain"
                  objectPosition="right"
                  src="/assets/images/other/thanks.png"
                />
              </div>
              <h4 className="form-modal__form-telegram">
                А пока подписывайтесь на наш телеграм канал, здесь мы
                выкладываем лучшие предложения с аукционов!
              </h4>
              <a
                href="https://t.me/BENJAMINAUTO"
                className="form-modal__form-link"
              >
                Перейти в Telegram канал <TelegramSVG />
              </a>

              <button
                className="form-modal__form-button"
                onClick={() => {
                  send(false)
                  sendRequest(false)
                  router.push({
                    query: '',
                  })
                  setModalVisability()
                }}
              >
                НА ГЛАВНУЮ
              </button>
              <div className="form-modal-thanks-circle">
                <CircleSVG />
              </div>
            </div>
            <ModalContacts />
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
