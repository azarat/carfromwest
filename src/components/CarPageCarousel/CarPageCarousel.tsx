import Carousel from '../Carousel/Carousel'
// SVG
import ArrowRightSVG from '../../assets/svg/arrow-right-car.svg'
import ArrowLeftSVG from '../../assets/svg/arrow-left-car.svg'

import FullSizeSVG from '../../assets/svg/full-size.svg'
import PhotoSVG from '../../assets/svg/total-carus.svg'
import { useEffect, useState } from 'react'
import CarouselModal from '../CarouselModal/CarouselModal'
import CarouselImage from './CarouselImage'
import CarouselGrid from './CarouselGrid'

type CarPageCarouselProps = {
  images: string[]
}

const CarPageCarousel: React.FC<CarPageCarouselProps> = ({
  images,
}): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setCurrentSlide(currentSlide)
  }, [currentSlide])

  return (
    <>
      <div className="car-page__carousel">
        <div
          role="presentation"
          onClick={() => {
            document.querySelector('body')?.classList.add('fixed')
            setOpenModal(true)
          }}
          className="car-page__carousel-full-size"
        >
          <FullSizeSVG />
        </div>
        <Carousel
          buttonNext={<ArrowRightSVG />}
          buttonPrev={<ArrowLeftSVG />}
          callback={setCurrentSlide}
          initialSlide={currentSlide}
        >
          {images.map((item) => (
            <CarouselImage url={item} key={item} />
          ))}
        </Carousel>
        <div className="car-page__carousel-total">
          <PhotoSVG />
          {images.length} фото
        </div>
        <CarouselModal
          open={openModal}
          onClose={() => {
            document.querySelector('body')?.classList.remove('fixed')
            setOpenModal(false)
          }}
          images={images}
          setCurrentSlide={setCurrentSlide}
          initialSlide={currentSlide}
        >
          <img
            className="carousel__modal-img"
            src={images[currentSlide]}
            alt="full-size car"
          />
        </CarouselModal>
      </div>
      <CarouselGrid
        images={images}
        setCurrentSlide={setCurrentSlide}
        setOpenModal={setOpenModal}
      />
    </>
  )
}

export default CarPageCarousel
