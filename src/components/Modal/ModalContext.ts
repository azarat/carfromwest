import { createContext } from 'react'

const ModalContext = createContext({
  modalVisability: false,
  setModalVisability: () => {},
})

export default ModalContext
