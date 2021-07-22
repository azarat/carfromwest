import { IFilter } from '../FilterFull/Types'
export type CatalogSortProps = {
  handleSort: (e: any) => void
  loading: boolean
  filter: Partial<IFilter>
}
