export type CatalogGridProps = {
  cars: ICarsFetchTypes | undefined
  loading: boolean
}

export interface ICarImage {
  i: string
  t: string
}

export interface ICar {
  id: string
  type: string
  attributes: {
    auction: string
    auctionLotId: number
    auctionDate: string
    lotData: {
      vin: string
      type: string
      make: string
      model: string
      trim: string
      year: number
      images: ICarImage[]
      sale: {
        branch: {
          id: number
          country: string
          state: string
          city: string
          zip: string
          locationName: string
        }
        retailPrice: string
        sellerReserveMet: false
        currentBid: string
        saleDocument: {
          group: number
          state: string
          type: string
        }
        sold: false
        seller: {
          displayName: string
          insurance: true
        }
      }
      info: {
        primaryDamage: string
        secondaryDamage: string
        lossType: string
        fuelType: number
        drivelineType: number
        transmissionType: number
        engine: {
          capacity: string
          cylinders: number
        }
        odometer: {
          value: number
        }
        bodyStyle: string
        color: string
        keys: true
        runnable: false
        startState: number
      }
    }
  }
}

export interface ICarsFetchTypes {
  data: ICar[]
  links: {
    first: string
    self: string
    last: string
    next: string
  }
  meta: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
  }
}

export type CatalogItemProps = {
  fuelType: string
  hightBid: number
  imageUrl: string
  lotNumber: string
  make: string
  modelGroup: string
  odometer: number
  vin: string
  year: number
}
