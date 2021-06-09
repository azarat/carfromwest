import React, {
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

type CarouselModalImageProps = {
  url: string
}

const CarouselModalImage: React.FC<CarouselModalImageProps> = ({ url }) => {
  const [isZoomed, zoom] = useState(false)
  const imgRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const img = imgRef.current

    const handleMove = (e: MouseEvent): void => {
      if (isZoomed) {
        const { offsetX, offsetY } = e
        if (img) img.style.backgroundPosition = `-${offsetX}px -${offsetY}px`
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
        : `-${offsetX}px -${offsetY}px`
      zoom((prev) => !prev)
    }
  }

  return (
    <div
      className={`car-page__carousel-img car-page__carousel-img--full ${
        isZoomed ? 'car-page__carousel-img--full--zoomed' : ''
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

export default CarouselModalImage
