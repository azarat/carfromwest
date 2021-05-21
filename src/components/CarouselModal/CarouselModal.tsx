import React from 'react'
import { createPortal } from 'react-dom'

type CarouselModalProps = {
  onClose: () => void
  open: boolean
}

const CarouselModal: React.FC<CarouselModalProps> = ({
  children,
  onClose,
  open,
}) => {
  return open
    ? createPortal(
        <div className="carousel__modal">
          <div onClick={onClose} className="carousel__modal-close">
            &times;
          </div>
          {children}
        </div>,
        document.body
      )
    : null
}

export default CarouselModal
