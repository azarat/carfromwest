import React, { Dispatch, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import ArrowSVG from '../../assets/svg/carouselArrow.svg'
import Carousel from '../Carousel/Carousel'

type CarouselModalProps = {
  onClose: () => void
  open: boolean
  images: string[]
  setCurrentSlide: Dispatch<SetStateAction<number>>
  initialSlide?: number
}

const CarouselModal: React.FC<CarouselModalProps> = ({
  onClose,
  open,
  images,
  setCurrentSlide,
  initialSlide,
}) => {
  return open
    ? createPortal(
        <div className="carousel__modal">
          <div
            className="carousel__modal-outside"
            onClick={onClose}
            role="presentation"
          />
          <div
            className="carousel__modal-close"
            onClick={onClose}
            role="presentation"
          >
            &times;
          </div>
          <Carousel
            buttonNext={<ArrowSVG />}
            buttonPrev={<ArrowSVG />}
            callback={setCurrentSlide}
            infinity={true}
            initialSlide={initialSlide}
          >
            {images.map((item) => (
              <img
                key={item}
                className="car-page__carousel-img car-page__carousel-img--fullsize"
                loading="lazy"
                src={
                  item
                    ? item
                    : 'https://manxmotortrader.com/wp-content/themes/kensington/img/placeholder.jpg'
                }
                alt="car"
              />
            ))}
          </Carousel>
        </div>,
        document.body
      )
    : null
}

export default CarouselModal
