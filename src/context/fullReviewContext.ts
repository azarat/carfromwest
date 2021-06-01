import { createContext } from 'react'
import { FullReviewContextTypes } from './Types'

const FullReviewContext = createContext<Partial<FullReviewContextTypes>>({})

export default FullReviewContext
