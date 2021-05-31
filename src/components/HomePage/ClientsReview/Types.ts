import { Dispatch, SetStateAction } from 'react'

export type ReviewsItemProps = {
  name: string
  profileLink?: string
  text: string
  images: Array<string>
  index: number
}

export type FullReviewProps = {
  activeReview: number | null
  isFullReviewOpen: boolean
}

export type FullSizeImgProps = {
  images: Array<string>
  initialSlide: number
  setFullImgOpen: Dispatch<SetStateAction<boolean>>
}
