import React, {
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

interface ICarouselImage {
  url: string
}

const CarouselImage: React.FC<ICarouselImage> = ({ url }) => {
  const [isZoomed, zoom] = useState(false)
  const imgRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const img = imgRef.current

    const handleMove = (e: MouseEvent): void => {
      if (isZoomed) {
        const { offsetX, offsetY } = e
        if (img)
          img.style.backgroundPosition = `-${offsetX / 1.5}px -${
            offsetY / 1.5
          }px`
      }
    }

    if (img) {
      img.addEventListener('mousemove', handleMove)
    }
    return () => {
      if (img) {
        img.removeEventListener('mousemove', handleMove)
      }
    }
  }, [isZoomed, imgRef])

  const handleZoom: MouseEventHandler = (e) => {
    const { offsetX, offsetY } = e.nativeEvent

    if (imgRef.current) {
      imgRef.current.style.backgroundSize = isZoomed ? '' : '170%'
      imgRef.current.style.backgroundPosition = isZoomed
        ? ''
        : `-${offsetX / 1.5}px -${offsetY / 1.5}px`
      zoom((prev) => !prev)
    }
  }

  return (
    <div
      className={`car-page__carousel-img car-page__carousel-img ${
        isZoomed ? 'car-page__carousel-img--zoomed' : ''
      }`}
      ref={imgRef as RefObject<HTMLDivElement>}
      style={{
        backgroundImage: `url(${url})`,
      }}
      onClick={handleZoom}
      role="presentation"
    ></div>
  )
}

export default CarouselImage
