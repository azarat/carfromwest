import React from 'react'
import { AdvantagesItems } from '../../../constants/AdvantagesItems'

const Advantages: React.FC = () => {
  return (
    <section id="advantages-section" className="advantages">
      <h2 className='advantages__title'>Наші переваги</h2>
      <div className="advantages__grid">
        {AdvantagesItems.map(({ id, icon: Icon, title, description }) => (
          <div key={id} className="advantages__grid-item">
            <div className="advantages__grid-item-svg">
              <Icon />
            </div>
            <h4 className="advantages__grid-item-title">{title}</h4>
            <p className="advantages__grid-item-description">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Advantages
