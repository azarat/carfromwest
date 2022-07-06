import React from 'react'
import { AdvantagesAutoItems } from '../../../constants/advantagesAutoItems'

const AdvantagesAuto: React.FC = () => {
  return (
    <section id="advantagesAuto-section" className="advantagesAuto">
      <h2 className='advantagesAuto__title'>Переваги авто із США</h2>
      <p className="advantagesAuto__pre-title">Перевага саме американських аукціонів</p>
      <div className="advantagesAuto__grid">
        {AdvantagesAutoItems.map(({ id, icon: Icon, title, description }) => (
          <div key={id} className="advantagesAuto__grid-item">
            <div className="advantagesAuto__grid-item-svg">
              <Icon width={40} height={32} />
            </div>
            <h4 className="advantagesAuto__grid-item-title">{title}</h4>
            <p className="advantagesAuto__grid-item-description">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AdvantagesAuto
