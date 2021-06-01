import { Dispatch, SetStateAction } from 'react'

export type FullReviewContextTypes = {
  activeReview: number | null
  setActiveReview: Dispatch<SetStateAction<number | null>>
  isFullReviewOpen: boolean
  handleFullReview: () => void
}
