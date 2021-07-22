import { useState, useEffect, FC } from 'react'
import Select from 'react-select'
import Link from 'next/link'

import { IAutoSearchProps } from './Types'

import { vehicleTypes } from '../../../constants/filter'
import CrossSVG from '../../../assets/svg/close.svg'

const years: number[] = []

for (let i = 2010; i <= new Date().getFullYear(); i++) years.push(i)

const AutoSearch: FC<IAutoSearchProps> = ({
  isFormOpen,
  handleFormOpen,
}): JSX.Element => {
  const [carType, setCarType] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [marks, setMarks] = useState()
  const [currentMark, setCurrentMark] = useState<string>()
  const [models, setModels] = useState()
  const [currentModel, setCurrentModel] = useState<string>()
  const [yearFrom, setYearFrom] = useState<number>()
  const [yearTo, setYearTo] = useState<number>()

  useEffect(() => {
    setLoading(true)
    const url = `/api/filter?filters=makes&vehicleType=${carType}`
    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        setMarks(
          json?.makes.sort().map((val: string) => ({
            label: val,
            value: val,
          })) || []
        )
      )
      .catch(() => setMarks(undefined))
      .finally(() => setLoading(false))
  }, [carType])

  useEffect(() => {
    if (currentMark) {
      setLoading(true)
      const url = `/api/filter?filters=models&vehicleType=${carType}&makes=${currentMark}`
      fetch(url, {})
        .then((res) => res.json())
        .then((json) =>
          setModels(
            json?.models.sort().map((val: string) => ({
              label: val,
              value: val,
            })) || []
          )
        )
        .catch(() => setModels(undefined))
        .finally(() => setLoading(false))
    }
  }, [currentMark])

  return (
    <div className={`auto-search ${isFormOpen ? 'auto-search--open' : ''}`}>
      <button className="auto-search__button" onClick={handleFormOpen}>
        <CrossSVG />
      </button>
      <form className="auto-search__form">
        <Select
          onChange={(value) => setCarType(value?.value as string)}
          isSearchable={false}
          placeholder="Автомобиль"
          className="auto-search__form-select"
          classNamePrefix="react-select"
          options={vehicleTypes.map(({ title, value }) => ({
            label: title,
            value,
          }))}
        />
        <Select
          value={
            currentMark ? { label: currentMark, value: currentMark } : undefined
          }
          onChange={(value) => setCurrentMark(value?.value)}
          isDisabled={isLoading || !carType}
          isSearchable={true}
          noOptionsMessage={() => 'Ничего не найдено'}
          placeholder="Марка"
          className="auto-search__form-select"
          classNamePrefix="react-select"
          options={marks}
        />
        <Select
          value={
            currentModel
              ? { label: currentModel, value: currentModel }
              : undefined
          }
          onChange={(value) => setCurrentModel(value?.value)}
          isDisabled={isLoading || !currentMark}
          isSearchable={true}
          noOptionsMessage={() => 'Ничего не найдено'}
          isLoading={isLoading}
          placeholder="Модель"
          className="auto-search__form-select"
          classNamePrefix="react-select"
          options={models}
        />
        <Select
          value={yearFrom ? { label: yearFrom, value: yearFrom } : undefined}
          onChange={(value) => setYearFrom(value?.value)}
          isSearchable={true}
          placeholder="Год от"
          className="auto-search__form-select auto-search__form-select-year"
          classNamePrefix="react-select"
          options={years
            .filter((val) => (yearTo ? val < yearTo : true))
            .map((year) => ({ label: year, value: year }))}
        />
        <span className="auto-search__form-span" />
        <Select
          value={yearTo ? { label: yearTo, value: yearTo } : undefined}
          onChange={(value) => setYearTo(value?.value)}
          isSearchable={true}
          placeholder="Год до"
          className="auto-search__form-select auto-search__form-select-year-second"
          classNamePrefix="react-select"
          options={years
            .filter((val) => (yearFrom ? val > yearFrom : true))
            .map((year) => ({ label: year, value: year }))}
        />
        <Link
          href={{
            pathname: '/catalog',
            query: {
              makes: currentMark,
              models: currentModel,
              type: carType,
              yearMin: yearFrom,
              yearMax: yearTo,
            },
          }}
        >
          <button className="auto-search__form-button" type="button">
            ИСКАТЬ
          </button>
        </Link>
      </form>
    </div>
  )
}

export default AutoSearch
