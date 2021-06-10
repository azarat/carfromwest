import { Dispatch, SetStateAction } from 'react'

export type CarouselGridProps = {
  images: string[]
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setCurrentSlide: Dispatch<SetStateAction<number>>
}
