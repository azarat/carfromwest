import React from 'react'
import { consultGallery } from '../../../constants/consultGallery'
import Image from 'next/image'
import { useState } from 'react'
import ConsultGalleryFull from './ConsultGalleryFull'

const ConsultGallery: React.FC = () => {
  const [isFullOpen, setFullOpen] = useState<boolean>(false)
  const [initialSlide, setInitialSlide] = useState<number>(0)

  const handleFull = (): void => {
    setFullOpen((prev) => !prev)
    document.body.classList.toggle('fixed')
  }

  const handleSlide = (i: number) => {
    handleFull()
    setInitialSlide(i)
  }
  return (
    <>
      <div className="consult__gallery">
        <>
          <div className="consult__gallery-last">
            Ще&nbsp;
            <span className="consult__gallery-last-mobile">
              {consultGallery.length - 3} +
            </span>
            <span className="consult__gallery-last-tablet">
              {consultGallery.length - 6} +
            </span>
            <span className="consult__gallery-last-desktop">
              {consultGallery.length - 9} +
            </span>
          </div>
          {consultGallery.map(({ id, url }, i) => (
            <div
              role="presentation"
              className="consult__gallery-img"
              key={id}
              onClick={() => handleSlide(i)}
            >
              <Image
                loading="eager"
                src={url}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </>
      </div>
      {isFullOpen && (
        <ConsultGalleryFull
          initialSlide={initialSlide}
          handleFull={handleFull}
        />
      )}
    </>
  )
}

export default ConsultGallery
