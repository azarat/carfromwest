import { NextPage, GetServerSideProps } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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
import { gas, transmissions, vehicleTypes } from '../../src/constants/filter'

const Index: NextPage<Partial<ICatalog>> = ({
  makes,
  type = '',
  yearMin,
  yearMax,
  models,
  searchTerm,
}): JSX.Element => {
  const defaultFilter = {
    auctions: ['copart', 'iaai'],
    vehicleType: 'automobile',
    countries: ['US'],
    page: 1,
    itemsPerPage: 12,
    sortField: 'added-date',
    sortDirection: 'asc',
    includeFilters: ['auctions'],
  }
  const includeFilters = ['vehicleTypes']
  const initialMakes = []
  const initialModels = []

  if (makes) {
    includeFilters.push('makes')
    initialMakes.push(makes)
  }
  if (models) {
    includeFilters.push('models')
    initialModels.push(models)
  }
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [cars, setCars] = useState<ICarsFetchTypes | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<Partial<IFilter>>(
    makes || type || yearMin || yearMax || models || searchTerm
      ? {
          includeFilters: includeFilters,
          makes: initialMakes,
          vehicleType: type ? type : 'automobile',
          models: initialModels,
          yearMin: yearMin ? +yearMin : null,
          yearMax: yearMax ? +yearMax : null,
        }
      : typeof localStorage !== 'undefined'
      ? JSON.parse(
          localStorage.getItem('filter') ?? JSON.stringify({ ...defaultFilter })
        )
      : { ...defaultFilter }
  )
  const [loading, setLoading] = useState<boolean>(false)

  const fetchCars = useCallback(
    (page = 1) =>
      (async (page) => {
        setLoading(true)
        const cfwURL = '/api/test-lots'

        const response = await fetch(cfwURL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            ...filter,
            page,
            itemsPerPage: 12,
            yearMin: filter.yearMin || 2010,
          }),
        })
        const cfwData = await response.json()

        setCars(cfwData)
        setLoading(false)
      })(page),
    [filter]
  )

  useEffect(() => {
    setFilter((prev) => ({ ...prev, searchTerm: router.query.searchTerm }))
  }, [router.query.searchTerm])

  useEffect(() => {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem('filter', JSON.stringify(filter))

    fetchCars(page)
  }, [filter, page, fetchCars])

  const handleSearch = (searchTerm: string): void => {
    setFilter({ ...filter, searchTerm })
  }

  const handleSort = ({ value }: { value: string }): void => {
    setPage(1)
    const [sortField, sortDirection] = value.split('--')
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
        <FilterTable
          filter={filter}
          setFilter={setFilter}
          loading={loading}
          setPage={setPage}
        />
        <div className="catalog__filters-wrapper">
          <CatalogSearch loading={loading} handleSearch={handleSearch} />
          <FilterField
            loading={loading}
            setOpen={setOpenFilter}
            filter={filter}
            setFilter={setFilter}
          />
          <CatalogSort
            handleSort={handleSort}
            filter={filter}
            loading={loading}
          />
          <div className="filter-field__grid">
            <div className="filter-field__grid-list">
              {Object.keys(filter)
                .filter((key) => {
                  if (
                    [
                      'sortField',
                      'sortDirection',
                      'auctions',
                      'vehicleType',
                      'bodyStyles',
                      'countries',
                      'page',
                      'itemsPerPage',
                      'includeFilters',
                    ].includes(key)
                  )
                    return false
                  if (Array.isArray(filter[key])) return filter[key].length > 0
                  return !!filter[key]
                })
                .map((key) => {
                  let title = filter[key]
                  if (key === 'type')
                    title = vehicleTypes.filter(
                      (val) => val.value === filter[key]
                    )[0].title
                  if (key === 'fuelType')
                    title =
                      gas.find((val) => val.value === filter.fuelType)?.label ||
                      ''
                  if (
                    key === 'engineCapacities' &&
                    filter.engineCapacities?.length
                  )
                    title = `${filter.engineCapacities[0]} - ${
                      filter.engineCapacities[
                        filter.engineCapacities.length - 1
                      ]
                    }`

                  if (key === 'transmissionTypes')
                    title = transmissions.filter(
                      (val) =>
                        filter.transmissionTypes?.length &&
                        val.value === filter.transmissionTypes[0]
                    )[0]?.label
                  if (/^year_min$/.test(key)) title = `c ${title}`
                  else if (/_min$/.test(key) || key === 'Price')
                    title = `от ${title}`
                  if (/_max$/.test(key)) title = `до ${title}`
                  if (/^Price/.test(key)) title = `${title}$`
                  if (/^year/.test(key)) title = `${title}г.`
                  if (/^engine/.test(key)) title = `${title}л.`

                  return (
                    <div key={title} className="filter-field__grid-item">
                      <div className="filter-field__grid-item-text">
                        {title}
                      </div>
                      <button
                        disabled={loading}
                        className="filter-field__grid-item-delete"
                        onClick={() => {
                          setFilter(
                            Object.keys(filter)
                              .filter((k) => !!filter[k] && k !== key)
                              .reduce(
                                (obj, key) =>
                                  Object.assign(obj, { [key]: filter[key] }),
                                {}
                              ) as IFilter
                          )
                        }}
                      />
                    </div>
                  )
                })}
            </div>
            {Object.keys(filter).filter((key) => {
              if (
                [
                  'sortField',
                  'sortDirection',
                  'auctions',
                  'vehicleType',
                  'bodyStyles',
                  'countries',
                  'page',
                  'itemsPerPage',
                  'includeFilters',
                ].includes(key)
              )
                return false
              if (Array.isArray(filter[key])) return filter[key].length > 0
              return !!filter[key]
            }).length > 0 && (
              <button
                className="filter-field__grid-item filter-field__grid-item--reset"
                onClick={() => {
                  setFilter({})
                  router.push({ query: {} })
                  setPage(1)
                }}
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>

        <CatalogGrid loading={loading} cars={cars}>
          {cars && <Pagination page={page} cars={cars} setPage={setPage} />}
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
