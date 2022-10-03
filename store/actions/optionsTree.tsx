import * as OPTIONS_TREE from '../types/optionsTree'

const updateOptionsTree = (optionsTree: any) => {
  return {
    type: OPTIONS_TREE.UPDATE_OPTION_TREE,
    payload: { optionsTree },
  }
}

export { updateOptionsTree }
