import React from 'react'
import PhoneSVG from '../../../public/assets/images/svg/phone.svg'

const ModalContacts: React.FC = (): JSX.Element => {
  return (
    <div className="form-modal__form-social">
      <h3 className="form-modal__form-social-header">СВЯЖИТЕСЬ С НАМИ</h3>
      <a href="tel:+38 068-555-88-20" className="form-modal__form-social-phone">
        <PhoneSVG />
        +38 068-555-88-20
      </a>
      <h5 className="form-modal__form-social-expert">
        Эксперт по подбору авто, Владимир
      </h5>
    </div>
  )
}

export default ModalContacts
