// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { createPortal } from 'react-dom'
import CloseSVG from '../../../assets/svg/close.svg'

interface PromoModal {
  close: () => void
}

const PromoModal: React.FC<PromoModal> = ({ close }) => {
  return createPortal(
    <div className="video-modal">
      <div role="presentation" onClick={close} className="video-modal-close" />
      <div className="video-wrapper">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/iosiNv5Nr4A"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div role="presentation" className="video-cross" onClick={close}>
        <CloseSVG />
      </div>
    </div>,
    document.body
  )
}

export default PromoModal
