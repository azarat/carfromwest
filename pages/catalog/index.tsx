import { NextPage, GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
// Components
import CatalogGrid from '../../src/components/CatalogGrid/CatalogGrid'
import CatalogSort from '../../src/components/CatalogSort/CatalogSort'
import FilterField from '../../src/components/FilterField/FilterField'
import FilterFull from '../../src/components/FilterFull/FilterFull'
import FilterTable from '../../src/components/FilterFull/FilterTable'
// Types
import { ICarsFetchTypes } from '../../src/components/CatalogGrid/Types'
import { IFilter } from '../../src/components/FilterFull/Types'
import Pagination from '../../src/components/Pagination/Pagination'
import { ICatalog } from '../../src/Types/Types'
import CatalogSearch from '../../src/components/CatalogSearch/CatalogSearch'
import { capacityArray } from '../../src/helpers/calculator'

const Index: NextPage<Partial<ICatalog>> = ({
  makes,
  type = '',
  yearMin,
  yearMax,
  models,
  searchTerm,
}): JSX.Element => {
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [cars, setCars] = useState<ICarsFetchTypes | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<Partial<IFilter>>(
    makes || type || yearMin || yearMax || models || searchTerm
      ? {
          makes,
          type,
          yearMin,
          yearMax,
          models,
          searchTerm,
        }
      : typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('filter') ?? '{}')
      : {}
  )
  const [loading, setLoading] = useState<boolean>(false)

  const fetchCars = async (page = 1) => {
    setLoading(true)
    const cfwURL = '/api/lots'
    const queryParams = `includeFilters=false&itemsPerPage=12&onlyActive=true&auctions=iaai,copart&page=${page}`

    const filterString = Object.keys(filter)
      .filter((key) => filter[key])
      .map((key) => `${key}=${filter[key]}`)
      .join('&')
    const engineCapacitiesString = `engineCapacities=
      ${capacityArray(
        filter.engine_min ? filter.engine_min : 0.7,
        filter.engine_max ? filter.engine_max : 17
      ).join(',')}`

    const response = await fetch(
      `${cfwURL}?${queryParams}&${filterString}&${engineCapacitiesString}`
    )
    const cfwData = await response.json()

    setCars(cfwData)
    setLoading(false)
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem('filter', JSON.stringify(filter))

    fetchCars(page)
  }, [filter, page])

  const handleSearch = (searchTerm: string) => {
    setFilter({ ...filter, searchTerm })
  }

  const handleSort = ({ value }: { value: string }): void => {
    const [sortField, sortDirection] = value.split('-')
    setFilter({ ...filter, sortField, sortDirection })
  }

  return (
    <div className="catalog__wrapper">
      <section className="catalog">
        <FilterFull
          filter={filter}
          setFilter={setFilter}
          open={openFilter}
          setOpen={setOpenFilter}
          loading={loading}
        />
        <FilterTable filter={filter} setFilter={setFilter} loading={loading} />
        <FilterField
          loading={loading}
          setOpen={setOpenFilter}
          filter={filter}
          setFilter={setFilter}
        />
        <CatalogSearch loading={loading} handleSearch={handleSearch} />
        <CatalogSort handleSort={handleSort} loading={loading} />
        <CatalogGrid loading={loading} cars={cars}>
          <Pagination page={page} cars={cars} setPage={setPage} />
        </CatalogGrid>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: { ...ctx.query },
  }
}

export default Index
