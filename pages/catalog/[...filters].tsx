import { GetServerSideProps, NextPage } from 'next'

import { ParamType, aviableParams, range } from '../../src/helpers/urlToParams'

import { useEffect, useState } from 'react'
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
import { USER_AGENT } from '../../src/constants/userAgent'

const FiltersPage: NextPage<Partial<ICatalog>> = ({
  currentPage,
  currentParams,
  items,
  total,
  brands,
  makes,
  type = '',
  yearMin,
  yearMax,
  models,
  searchTerm,
  transport,
  brandModels,
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

  useEffect(() => {
    setFilter((prev) => ({ ...prev, searchTerm: router.query.searchTerm }))
  }, [router.query.searchTerm])

  useEffect(() => {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem('filter', JSON.stringify(filter))

  }, [filter, page])

  const handleSearch = (searchTerm: string): void => {
    setFilter({ ...filter, searchTerm })
  }

  const handleSort = ({ value }: { value: string }): Promise<boolean> => {
    const [sortField, sortDirection] = value.split('--')
    const queryIndex = router.asPath.indexOf('?');
    if (queryIndex === -1) {
      return router.push(`${router.asPath}?sortField=${sortField}&sortDirection=${sortDirection}`)
    }

    return router.push(`${router.asPath.slice(0, queryIndex)}?sortField=${sortField}&sortDirection=${sortDirection}`)
  }

  const vehicle = { items, total } as ICarsFetchTypes
  return (
    <div className="catalog__wrapper">
      <section className="catalog">
        <FilterFull
          makes={brands}
          filter={filter}
          setFilter={setFilter}
          open={openFilter}
          setOpen={setOpenFilter}
          loading={false}
        />
        <FilterTable
          transport={transport as string}
          filter={currentParams}
          setFilter={setFilter}
          loading={false}
          setPage={setPage}
          makes={brands}
          brandModels={brandModels}
        />
        <div className="catalog__filters-wrapper">
          <CatalogSearch loading={false} handleSearch={handleSearch} />
          <FilterField
            loading={false}
            setOpen={setOpenFilter}
            filter={filter}
            setFilter={setFilter}
          />
          <CatalogSort
            handleSort={handleSort}
            filter={filter}
            loading={false}
          />
          {/*TODO: Implements filters*/}
          {/* <div className="filter-field__grid">
            <div className="filter-field__grid-list">
              {Object.keys(currentParams)
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
                  if (Array.isArray(currentParams[key])) return currentParams[key].length > 0
                  return !!currentParams[key]
                })
                .map((key) => {
                 key)
                  let title = currentParams[key]
                  if (key === 'type')
                    title = vehicleTypes.filter(
                      (val) => val.value === filter[key]
                    )[0].title
                  if (key === 'fuelType')
                    title =
                      gas.find((val) => val.value === currentParams.fuelType)?.label ||
                      ''
                  if (
                    key === 'engineCapacities' &&
                    currentParams.engineCapacities?.length
                  )
                    title = `${currentParams.engineCapacities[0]} - ${currentParams.engineCapacities[
                      currentParams.engineCapacities.length - 1
                    ]
                      }`

                  if (key === 'transmissionTypes')
                    title = transmissions.filter(
                      (val) =>
                        currentParams.transmissionTypes?.length &&
                        val.value === currentParams.transmissionTypes[0]
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
                        disabled={false}
                        className="filter-field__grid-item-delete"
                        onClick={() => {
                          setFilter(
                            Object.keys(currentParams)
                              .filter((k) => !!currentParams[k] && k !== key)
                              .reduce(
                                (obj, key) =>
                                  Object.assign(obj, { [key]: currentParams[key] }),
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
          </div> */}
        </div>

        <CatalogGrid loading={false} cars={vehicle}>
          {items && !!items.length && <Pagination page={currentPage as number} cars={vehicle} setPage={setPage} />}
        </CatalogGrid>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const transportParam = ((query?.filters || []) as string[]).find(f => f.includes('transport-is-'))
  const brandParam = ((query?.filters || []) as string[]).find(f => f.includes('brand-is-'))
  const currentParams = Object.keys(aviableParams).reduce(
    (acc: any, param) => {
      
      const currentParam = `${param}-is-`
      const urlParam = ((query?.filters || []) as string[]).find((p) =>
        p.includes(currentParam)
      )

      if (urlParam) {
        const paramValue = urlParam.replace(currentParam, '')
        const filterName =
          aviableParams[param as keyof typeof aviableParams].filterName
        const type = aviableParams[param as keyof typeof aviableParams].type
        const name = aviableParams[param as keyof typeof aviableParams].name
        if (filterName) {
          acc.includeFilters.push(filterName)
        }

        if (type === ParamType.array) {
          return {
            ...acc,
            [name]: [paramValue],
          }
        }

        if (type === ParamType.string) {
          return {
            ...acc,
            [name]: paramValue,
          }
        }

        if (type === ParamType.number) {
          return {
            ...acc,
            [name]: +paramValue,
          }
        }

        if (type === ParamType.volume) {
          const splited = paramValue.split('to')
          return {
            ...acc,
            [name]: range(+splited[0], +splited[1], 0.1),
          }
        }

        return {
          ...acc,
          [param]: urlParam.replace(currentParam, ''),
        }
      }

      return acc
    },
    {
      page: +query.page! || 1,
      sortField: query.sortField || 'added-date',
      sortDirection: query.sortDirection || 'asc',
      includeFilters: [],
      itemsPerPage: 12,
    }
  )
  const filtersUrl = brandParam ?
    `http://46.101.185.57:8080/search/v1/filters?filters=makes,models&makes=${(brandParam as string).replace('brand-is-', '')}&vehicleType=automobile&auctions=iaai,copart` :
    'http://46.101.185.57:8080/search/v1/filters?filters=makes&vehicleType=automobile&auctions=iaai,copart'
  const filterResponse = await fetch(filtersUrl, {
    headers: {
      'user-agent': req.headers['user-agent'] || USER_AGENT,
      Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
      'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
    },
  })

  const { makes, models } = await filterResponse.json()
  const carsUrl = `http://46.101.185.57:8080/search/v1/lots`
  const carsResponse = await fetch(carsUrl, {
    method: 'POST',
    headers: {
      'user-agent': req.headers['user-agent'] || USER_AGENT,
      Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
      'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentParams),
  })

  const { items, total } = await carsResponse.json();
  return {
    props: {
      currentParams,
      items: items ?? [],
      total: total ?? 0,
      brands: makes,
      brandModels: models ?? null,
      currentPage: +query.page! || 1,
      transport: transportParam ? transportParam.replace('transport-is-', '') : 'automobile'
    },
  }
}
export default FiltersPage
