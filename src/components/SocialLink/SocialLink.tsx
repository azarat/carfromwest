import React from 'react'
import { SocialLinkItems } from '../../constants/SocialLinkItems'

const SocialLink: React.FC = () => {
  return (
    <div className="social-link">
      <ul className="social-link__list">
        {SocialLinkItems.map(({ id, icon: Icon, href }) => (
          <li key={id} className="social-link__item">
            <a target="_blank" href={href}>
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialLink
