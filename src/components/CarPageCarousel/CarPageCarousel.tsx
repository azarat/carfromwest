import Carousel from '../Carousel/Carousel'
// SVG
import ArrowSVG from '../../assets/svg/carouselArrow.svg'
import FullSizeSVG from '../../assets/svg/fullsize.svg'
import PhotoSVG from '../../assets/svg/photo.svg'
import { useState } from 'react'
import CarouselModal from '../CarouselModal/CarouselModal'

type CarPageCarouselProps = {
  images: string[]
}

const CarPageCarousel: React.FC<CarPageCarouselProps> = ({
  images,
}): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="car-page__carousel">
      <div
        role="presentation"
        onClick={() => setOpenModal(true)}
        className="car-page__carousel-full-size"
      >
        <FullSizeSVG />
      </div>
      <Carousel
        buttonNext={<ArrowSVG />}
        buttonPrev={<ArrowSVG />}
        callback={setCurrentSlide}
      >
        {images.map((item) => (
          <img
            key={item}
            className="car-page__carousel-img"
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
      <div className="car-page__carousel-total">
        <PhotoSVG />
        {images.length} фото
      </div>
      <CarouselModal open={openModal} onClose={() => setOpenModal(false)}>
        <img
          className="carousel__modal-img"
          src={images[currentSlide]}
          alt="full-size car"
        />
      </CarouselModal>
    </div>
  )
}

export default CarPageCarousel