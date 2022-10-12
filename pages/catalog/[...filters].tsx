import { GetServerSideProps, NextPage } from 'next'

import { ParamType, aviableParams, range } from '../../src/helpers/urlToParams'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Components
import CatalogGrid from '../../src/components/CatalogGrid/CatalogGrid'
import CatalogSort from '../../src/components/CatalogSort/CatalogSort'
import FilterField from '../../src/components/FilterField/FilterField'
// import FilterFull from '../../src/components/FilterFull/FilterFull'
import FilterTable from '../../src/components/FilterFull/FilterTable'
// Types
// import { ICarsFetchTypes } from '../../src/components/CatalogGrid/Types'
import { IFilter } from '../../src/components/FilterFull/Types'
import Pagination from '../../src/components/Pagination/Pagination'
import { ICatalog } from '../../src/Types/Types'
import CatalogSearch from '../../src/components/CatalogSearch/CatalogSearch'
import { USER_AGENT } from '../../src/constants/userAgent'

import FilterSVG from '../../src/assets/svg/filter_1.svg'

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
    excludeFilters: [],
  }
  const excludeFilters: string[] = []
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
  const [activeMobFilter, setActiveMobFilter] = useState<boolean>(false)
  // const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<Partial<IFilter>>(
    makes || type || yearMin || yearMax || models || searchTerm
      ? {
          excludeFilters: excludeFilters,
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
    const queryIndex = router.asPath.indexOf('?')
    if (queryIndex === -1) {
      return router.push(
        `${router.asPath}?sortField=${sortField}&sortDirection=${sortDirection}`
      )
    }

    return router.push(
      `${router.asPath.slice(
        0,
        queryIndex
      )}?sortField=${sortField}&sortDirection=${sortDirection}`
    )
  }

  const toggleFilter = () => {
    setActiveMobFilter(!activeMobFilter)
  }

  const vehicle = { items, total } as any /*  as ICarsFetchTypes */

  return (
    <div className="catalog__wrapper">
      <section className="catalog">
        <FilterTable
          transport={transport as string}
          filter={currentParams}
          setFilter={setFilter}
          loading={false}
          setPage={setPage}
          makes={brands}
          brandModels={brandModels}
          mobileActive={activeMobFilter}
        />
        <div className="catalog__filters-wrapper">
          <FilterField
            loading={false}
            // setOpen={setOpenFilter}
            filter={filter}
            setFilter={setFilter}
          />
          <CatalogSearch loading={false} handleSearch={handleSearch} />
          <div className="catalog-sort-wrap">
            <button className="mobile-filter-btn" onClick={toggleFilter}>
              <FilterSVG />
              Фільтр
            </button>

            <CatalogSort
              handleSort={handleSort}
              filter={filter}
              loading={false}
            />
          </div>
        </div>

        <CatalogGrid loading={false} cars={vehicle}>
          {items && !!items.length && (
            <Pagination
              page={currentPage as number}
              cars={vehicle}
              setPage={setPage}
            />
          )}
        </CatalogGrid>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const transportParam = ((query?.filters || []) as string[]).find((f) =>
    f.includes('transport-is-')
  )
  const brandParam = ((query?.filters || []) as string[]).find((f) =>
    f.includes('brand-is-')
  )
  const currentParams = Object.keys(aviableParams).reduce(
    (acc: any, param) => {
      const currentParam = `${param}-is-`
      const urlParam = ((query?.filters || []) as string[]).find((p) =>
        p.includes(currentParam)
      )

      if (urlParam) {
        // console.log('param', param);

        const paramValue = urlParam.replace(currentParam, '')
        const filterName =
          aviableParams[param as keyof typeof aviableParams].filterName
        const type = aviableParams[param as keyof typeof aviableParams].type
        const name = aviableParams[param as keyof typeof aviableParams].name
        if (filterName) {
          acc.includeFilters.push(filterName)
        } else {
          acc.excludeFilters.push(name)
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
      excludeFilters: [],
      includeFilters: [],
      itemsPerPage: 12,
    }
  )
  const filtersUrl = !!brandParam
    ? `http://46.101.185.57:8080/search/v1/filters?filters=makes,models&makes=${(
        brandParam as string
      ).replace('brand-is-', '')}&vehicleType=automobile&auctions=iaai,copart`
    : 'http://46.101.185.57:8080/search/v1/filters?filters=makes&vehicleType=automobile&auctions=iaai,copart'

  const filterResponse = await fetch(filtersUrl, {
    headers: {
      'user-agent': req.headers['user-agent'] || USER_AGENT,
      Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
      'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
    },
  })

  const { makes, models } = await filterResponse.json()

  // console.log('currentParams', currentParams);

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

  const response = await carsResponse.json()
  const { items } = response

  // console.log(response.violations);

  let items_filtered = items ?? []

  if (items_filtered.length && currentParams.excludeFilters.length) {
    currentParams.excludeFilters.forEach((exFilter: string) => {
      items_filtered = items_filtered.filter((item: any) => {
        switch (exFilter) {
          // case 'odometerMax':
          // return item.conditionInfo.odometer.value <= currentParams[exFilter]
          // case 'odometerMin':
          // return item.conditionInfo.odometer.value >= currentParams[exFilter]
          case 'sellerType':
            const itemSellerType = item.saleInfo.seller?.group ?? 'other'
            const filterSellerType = currentParams[exFilter]

            if (filterSellerType == 'insurance') {
              return filterSellerType == itemSellerType
            } else {
              return filterSellerType != 'insurance'
            }
          default:
            return true
        }
      })
    })
  }

  return {
    props: {
      currentParams,
      items: items_filtered,
      total: items_filtered.length ?? 0,
      brands: makes,
      brandModels: models ?? null,
      currentPage: +query.page! || 1,
      transport: transportParam
        ? transportParam.replace('transport-is-', '')
        : 'automobile',
    },
  }
}
export default FiltersPage
