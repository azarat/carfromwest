import * as DATE from '../types/updatedDate'

const updateDate = (updatedDate: []) => {
  return {
    type: DATE.UPDATE_DATE,
    payload: { updatedDate },
  }
}

export { updateDate }
