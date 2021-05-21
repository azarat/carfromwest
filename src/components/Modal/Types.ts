export interface IModalValues {
  name: string
  phone: string
  message: string
}

export interface IModalErrors {
  name?: string
  phone?: string
  message?: string
}

export interface IModalContext {
  modalVisability: boolean
  setModalVisability: () => void
}
