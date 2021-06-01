import React from 'react'
import FaqAccordion from './FaqAccordion'

const Faq: React.FC = () => {
  return (
    <div className="faq">
      <div className="faq__wrapper">
        <h2 className="faq__title">Ответы на вопросы</h2>
        <FaqAccordion />
      </div>
    </div>
  )
}

export default Faq
