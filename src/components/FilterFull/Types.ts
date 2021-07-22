import { Dispatch, SetStateAction } from 'react'

export type FilterFullProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setFilter: Dispatch<SetStateAction<Partial<IFilter>>>
  filter: Partial<IFilter>
  loading: boolean
}

export type FilterTableProps = {
  setFilter: Dispatch<SetStateAction<Partial<IFilter>>>
  filter: Partial<IFilter>
  loading: boolean
  setPage: Dispatch<SetStateAction<number>>
}

export interface IFilter {
  [key: string]: any
  auctions: string[]
  countries: string[]
  makes: string[]
  models: string[]
  trims: string[]
  vehicleConditions: string[]
  fuelTypes: string[]
  transmissionTypes: string[]
  drivelineTypes: string[]
  saleDocumentGroups: string[]
  damageTypes: string[]
  bodyStyles: string[]
  facilities: string[]
  features: string[]
  engineCapacities: string[]
  includeFilters: string[]
  engineCylinders: string[]
  fuelType: string
  vehicleType: string
  yearMin: number | null
  yearMax: number | null
  odometerMin: number
  odometerMax: number
  buyNowAvailable: boolean
  buyNowPriceMax: number
  onlyActive: boolean
  excludeWithoutAuctionDate: boolean
  auctionDateMin: Date
  auctionDateMax: Date
  searchTerm: string
  page: number
  itemsPerPage: number
  sortField: string
  sortDirection: string
}
