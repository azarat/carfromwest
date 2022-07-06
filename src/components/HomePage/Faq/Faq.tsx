import React from 'react'
import FaqAccordion from './FaqAccordion'

const Faq: React.FC = () => {
  return (
    <div id="section-faq" className="faq">
      <div className="faq__wrapper">
        <h2 className="faq__title">Відповіді на питання</h2>
        <FaqAccordion />
      </div>
    </div>
  )
}

export default Faq
