export type CarPageProps = {
  // carResponse: ILot
}

export interface ILot {
  auction: string
  lotNumber: string
  auctionDate: string
  lotInfo: {
    vehicleType: string
    vin: string
    make: string
    model: string
    trim: string
    year: number
  }
  specifications: {
    bodyStyle: {
      name: string
      type: string
    }
    engine: {
      capacity: string
      cylinders: number
    }
    fuelType: string
    transmissionType: string
    drivelineType: string
    color: string
  }
  conditionInfo: {
    condition: string
    odometer: {
      value: number
      unit: string
      status: string
    }
    primaryDamage: string
    secondaryDamage: string
    lossType: string
    keys: false
  }
  saleInfo: {
    sold: false
    currentBid: {
      value: number
      unit: string
    }
    finalBid: {
      value: number
      unit: string
    }
    branch: {
      id: number
      country: string
      state: string
      city: string
      zip: string
      locationName: string
      name: string
    }
    retailPrice: {
      value: number
      unit: string
    }
    sellerReserve: {
      value: number
      unit: string
    }
    sellerReserveMet: false
    saleDocument: {
      group: string
      state: string
      type: string
    }
    seller: {
      group: string
      displayName: string
    }
  }
  images: {
    full: string
    thumb: string
  }[]
}

export interface ISimilarCarousel {
  data: ILot[]
}

export interface ISimilarCar {
  data: ILot[]
  loading: boolean
}

export interface ICatalog {
  currentPage: number,
  currentParams: any
  brands: string[]
  makes: string[]
  type: string
  yearMin: number
  yearMax: number
  models: number | string
  searchTerm: string
  items: ILot[]
  total: number
  page: string
  transport: string
  brandModels: string[]
}

export type carResponseTypes = {
  Body_Style: string
  Buy_It_Now_Price: number
  Color: string
  Create_Date_Time: string
  Currency_Code: string
  Cylinders: string
  Damage_Description: string
  Day_of_Week: string
  Drive: string
  Engine: number
  Est_Retail_Value: number
  Fuel_Type: string
  Grid_Row: string
  Has_Keys_Yes_or_No: string
  High_Bid_non_vix_Sealed_Vix: number
  Image_Thumbnail: string
  Image_URL: any
  Image_URL_json: any
  Item: string
  Last_Updated_Time: string
  Location_ZIP: string
  Location_city: string
  Location_country: string
  Location_state: string
  Lot_Cond_Code: string
  Lot_number: string
  Make: string
  Make_an_Offer_Eligible: string
  Model_Detail: string
  Model_Group: string
  Odometer: number
  Odometer_Brand: string
  Repair_cost: number
  Runs_Drives: string
  Sale_Date_M_D_CY: string
  Sale_Status: string
  Sale_Title_State: string
  Sale_Title_Type: string
  Sale_time_HHMM: string
  Secondary_Damage: string
  Special_Note: string
  Time_Zone: string
  Transmission: string
  Trim: string
  VIN: string
  Vehicle_Type: string
  Yard_name: string
  Yard_number: number
  Year: number
  created_at: any
  id: number
  photos: any
  updated_at: any
}
