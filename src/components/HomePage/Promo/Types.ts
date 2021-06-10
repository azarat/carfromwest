import { MouseEventHandler } from 'react'

export interface IAutoSearchProps {
  isFormOpen?: boolean
  handleFormOpen: MouseEventHandler<HTMLButtonElement>
}
