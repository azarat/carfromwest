import { Dispatch, SetStateAction } from 'react'
import { ICarsFetchTypes } from '../CatalogGrid/Types'

export type PaginationProps = {
  setPage: Dispatch<SetStateAction<number>>
  cars: any /* ICarsFetchTypes */ 
  page: number
}
