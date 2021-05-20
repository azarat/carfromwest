import { ICar, ICarImage } from '../components/CatalogGrid/Types'
export type CarPageProps = {
  carResponse: ILot
}

export interface ILot {
  data: {
    id: string
    type: string
    attributes: {
      auction: string
      auctionLotId: number
      projectedWinBid: {
        min: string
        max: string
      }
      userData: null
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
          repairCost: string
          retailPrice: string
          sellerReserveMet: boolean
          currentBid: string
          saleDocument: {
            group: number
            state: string
            type: string
          }
          sold: boolean
          seller: {
            displayName: string
            insurance: boolean
          }
        }
        info: {
          primaryDamage: string
          secondaryDamage: string
          lossType: string
          odometer: {
            value: number
            unit: string
            actual: boolean
          }
          fuelType: number
          drivelineType: number
          transmissionType: number
          engine: {
            capacity: string
            cylinders: number
          }
          bodyStyle: string
          color: string
          keys: boolean
          runnable: boolean
          startState: number
        }
      }
    }
  }
}

export interface ISimilarCarousel {
  data: ICar[]
}

export interface ISimilarCar {
  data: ICar[]
  loading: boolean
}

export interface ICatalog {
  makes: string
  type: string
  yearMin: number
  yearMax: number
  models: number
  searchTerm: string
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
