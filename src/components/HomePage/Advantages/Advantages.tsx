import React from 'react'
import Title from '../../Title/Title'
import { AdvantagesItems } from '../../../constants/AdvantagesItems'
import Link from 'next/link'

const Advantages: React.FC = () => {
  return (
    <section id="advantages-section" className="advantages">
      <Title>Наши преимущества</Title>
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
      <Link href="/catalog">
        <a className="advantages__link">Поиск авто</a>
      </Link>
    </section>
  )
}

export default Advantages
