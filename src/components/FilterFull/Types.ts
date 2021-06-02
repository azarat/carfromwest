import { Dispatch, SetStateAction } from 'react'

export type FilterFullProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setFilter: Dispatch<SetStateAction<any>>
  filter: any
  loading: boolean
}

export type FilterTableProps = {
  setFilter: Dispatch<SetStateAction<any>>
  filter: any
  loading: boolean
  setPage: Dispatch<SetStateAction<number>>
}

export interface IFilter {
  [key: string]: any
  type: string
  engine_min: number
  engine_max: number
  year_min: number
  year_max: number
  odometer_min: number
  odometer_max: number
  Price: number
  //Price_max: Infinity;
  Make: string
  Body_Style: string
  Drive: string
  Buy_It_Now_Price_min: number
  Buy_It_Now_Price_max: number
  Fuel_Type: string
  Transmission: string
  filterBy: string
}
