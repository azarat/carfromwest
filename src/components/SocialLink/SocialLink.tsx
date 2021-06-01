import React from 'react'
import Link from 'next/link'
import { SocialLinkItems } from '../../constants/SocialLinkItems'

const SocialLink: React.FC = () => {
  return (
    <div className="social-link">
      <ul className="social-link__list">
        {SocialLinkItems.map(({ id, icon: Icon, href }) => (
          <li key={id} className="social-link__item">
            <Link href={href}>
              <a>
                <Icon />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialLink
