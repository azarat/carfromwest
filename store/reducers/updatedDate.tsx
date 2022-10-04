import * as DATE from '../types/updatedDate'

const initialState = {
  updatedDate: Date.now(),
}

const updatedDate = (state = initialState, action: any) => {
  switch (action.type) {
    case DATE.UPDATE_DATE:
      return {
        ...state,
        updatedDate: action.payload.updatedDate,
      }
    default:
      return state
  }
}

export default updatedDate
