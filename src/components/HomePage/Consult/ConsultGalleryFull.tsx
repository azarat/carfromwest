import React from 'react'
import { createPortal } from 'react-dom'
import { consultGallery } from '../../../constants/consultGallery'
import Carousel from '../../Carousel/Carousel'
import Image from 'next/image'
import ArrowSVG from '../../../assets/svg/carouselArrow.svg'
import { ConsultGalleryFullTypes } from './Types'

const ConsultGalleryFull: React.FC<ConsultGalleryFullTypes> = ({
  handleFull,
  initialSlide,
}) => {
  return createPortal(
    <div className="consult__full">
      <div className="consult__full-wrapper">
        <div
          className="consult__full-close"
          onClick={handleFull}
          role="presentation"
        >
          &times;
        </div>
        <Carousel
          buttonNext={<ArrowSVG />}
          buttonPrev={<ArrowSVG />}
          initialSlide={initialSlide}
        >
          {consultGallery.map(({ id, url }) => (
            <div className="consult__full-img" key={id}>
              <Image src={url} layout="fill" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>,
    document.body
  )
}

export default ConsultGalleryFull
