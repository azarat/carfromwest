import { Dispatch, SetStateAction } from 'react'
import { ICarsFetchTypes } from '../CatalogGrid/Types'

export type PaginationProps = {
  setPage: Dispatch<SetStateAction<number>>
cars: ICarsFetchTypes | undefined
  page: number
}
