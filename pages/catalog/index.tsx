import { NextPage, GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Components
import CatalogGrid from '../../src/components/CatalogGrid/CatalogGrid'
import CatalogSort from '../../src/components/CatalogSort/CatalogSort'
import FilterField from '../../src/components/FilterField/FilterField'
// import FilterFull from '../../src/components/FilterFull/FilterFull'
import FilterTable from '../../src/components/FilterFull/FilterTable'
// Types
import { ICarsFetchTypes } from '../../src/components/CatalogGrid/Types'
import { IFilter } from '../../src/components/FilterFull/Types'
import Pagination from '../../src/components/Pagination/Pagination'
import { ICatalog } from '../../src/Types/Types'
import CatalogSearch from '../../src/components/CatalogSearch/CatalogSearch'
// import { gas, transmissions, vehicleTypes } from '../../src/constants/filter'
import { USER_AGENT } from '../../src/constants/userAgent'

import FilterSVG from '../../src/assets/svg/filter_1.svg'


const Index: NextPage<Partial<ICatalog>> = ({
  items,
  total,
  brands,
  makes,
  type = '',
  yearMin,
  yearMax,
  models,
  searchTerm,
  page,
  transport,
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
  const [activeMobFilter, setActiveMobFilter] = useState<boolean>(false)
  // const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [, setPage] = useState<number>(1)
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

  const toggleFilter = () => {
    setActiveMobFilter(!activeMobFilter)
  }

  return (
    <div className="catalog__wrapper">
      <section className="catalog">
        <FilterTable
          transport={transport as string}
          filter={filter}
          setFilter={setFilter}
          loading={false}
          setPage={setPage}
          makes={brands}
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
          <div className='catalog-sort-wrap'>
            <button className='mobile-filter-btn' onClick={toggleFilter}>
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
          {items && !!items.length && <Pagination page={page ? +page : 1} cars={vehicle} setPage={setPage} />}
        </CatalogGrid>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const filtersUrl = 'http://46.101.185.57:8080/search/v1/filters?filters=makes&vehicleType=automobile&auctions=iaai,copart'
  const filterResponse = await fetch(filtersUrl, {
    headers: {
      'user-agent': ctx.req.headers['user-agent'] || USER_AGENT,
      Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
      'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
    },
  })
  const { makes } = await filterResponse.json();


  const lotsBody = ctx.query.searchTerm ? {
    "includeFilters": [
      "vehicleTypes"
    ],
    makes: [],
    vehicleType: "automobile",
    models: [],
    yearMin: 2010,
    yearMax: null,
    searchTerm: ctx.query.searchTerm,
    page: 1,
    itemsPerPage: 12
  } : {
    vehicleType: 'automobile',
    page: +ctx.query.page! || 1,
    itemsPerPage: 12,
    yearMin: 2010,
    sortField: ctx.query.sortField || 'added-date',
    sortDirection: ctx.query.sortDirection || 'asc',
  };

  const carsUrl = `http://46.101.185.57:8080/search/v1/lots`
  const carsResponse = await fetch(carsUrl, {
    method: 'POST',
    headers: {
      'user-agent': ctx.req.headers['user-agent'] || USER_AGENT,
      Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
      'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lotsBody),
  })

  const { items, total } = await carsResponse.json();

  return {
    props: {
      items,
      total,
      brands: makes,
      transport: 'automobile',
      ...ctx.query,
    },
  }
}

export default Index
