import React, { useState } from 'react'
import { faqList } from '../../../constants/faq'

const FaqAccordion: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  return (
    <div className="faq__accordion">
      {faqList.map(({ id, answer, question }, i) => (
        <div
          key={id}
          className={`faq__accordion-item ${
            activeFaq === i ? 'faq__accordion-item--open' : ''
          }`}
          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
          role="presentation"
        >
          <p className="faq__accordion-item-title">{question}</p>
          <span className="faq__accordion-item-text">{answer}</span>
        </div>
      ))}
    </div>
  )
}

export default FaqAccordion
