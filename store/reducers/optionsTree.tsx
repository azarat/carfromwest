import * as OPTIONS_TREE from '../types/optionsTree'

const initialState = {
  optionsTree: [],
}

const optionsTreeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPTIONS_TREE.UPDATE_OPTION_TREE:
      return {
        ...state,
        optionsTree: action.payload.optionsTree,
      }
    default:
      return state
  }
}

export default optionsTreeReducer
