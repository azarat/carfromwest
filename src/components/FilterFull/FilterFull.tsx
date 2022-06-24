import { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik'
import CustomSelect from './CustomSelect'
import SelectTransmission from './SelectTransmission'
// SVG
import RightArrowSVG from '../../assets/svg/right-arrow.svg'
import EngineSVG from '../../assets/svg/engine.svg'
import SpeedSVG from '../../assets/svg/speed.svg'

// Constants
import { years, gas, transmissions } from '../../constants/filter'

import { FilterFullProps, IFilter } from './Types'
import SelectMake from './SelectMake'
import { capacityArray } from '../../helpers/calculator'

const FilterFull: React.FC<FilterFullProps> = ({
  open,
  setOpen,
  filter,
  setFilter,
  loading,
  makes,
}): JSX.Element => {
  // const [vehicle, setVehicle] = useState<string>(filter.vehicleType || '')
  const [fromYear, setFromYear] = useState<number>(0)
  const [toYear, setToYear] = useState<number>(2021)
  const [marks, setMarks] = useState()
  const [bodyStyles, setBodyStyles] = useState<string[]>([])
  const [bodyStyle, setBodyStyle] = useState(
    filter.bodyTypes?.length ? filter.marks[0] : ''
  )
  const [currentMark, setCurrentMark] = useState<string>(
    filter.marks?.length ? filter.marks[0] : ''
  )
  const [currentModel, setCurrentModel] = useState<string>(
    filter.models?.length ? filter.models[0] : ''
  )
  const [models, setModels] = useState()
  const [isLoading, setLoading] = useState(false)

  const firstYears = years.filter((year) => year.value < toYear)
  const secondYears = years.filter((year) => year.value > fromYear)

  // const handleVehicle = (e: React.MouseEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement
  //   setVehicle(target.value)
  // }

  useEffect(() => {
    setCurrentMark(() => (filter.makes?.length ? filter.makes[0] : ''))
    setCurrentModel(() => (filter.models?.length ? filter.models[0] : ''))
  }, [filter])

  useEffect(() => {
    const url = `/api/filter?filters=makes`
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
  }, [])

  useEffect(() => {
    if (currentMark && !currentModel) {
      setLoading(true)
      setCurrentModel('')
      setBodyStyles([])
      setBodyStyle('')
      const url = `/api/filter?filters=makes,models&makes=${currentMark}`
      fetch(url)
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
  }, [currentMark, currentModel])

  useEffect(() => {
    if (currentModel) {
      setBodyStyles([])
      setBodyStyle('')
      const url = `/api/filter?filters=makes,models,bodyStyles&makes=${currentMark}&models=${currentModel}`
      fetch(url)
        .then((res) => res.json())
        .then((json) => setBodyStyles(json?.bodyStyles.sort()))
        .catch(() => {
          setBodyStyles([])
          setBodyStyle('')
        })
    }
  }, [currentMark, currentModel])

  useEffect(() => {
    open
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
  }, [open])

  const handleSubmit = (values: any) => {
    const includeFilters = Object.keys(values).filter(
      (k) =>
        [
          'auctions',
          'bodyStyles',
          'damageTypes',
          'engineCapacities',
          'engineCylinders',
          'fuelTypes',
          'drivelineTypes',
          'makes',
          'models',
          'trims',
          'saleDocumentsGroups',
          'transmissionTypes',
          // 'vehicleTypes',
          'locations',
          'vehicleConditions',
          'features',
          'countries',
        ].includes(k) && values[k]
    )

    const newFilter: Partial<IFilter> = {
      page: 1,
      includeFilters,
    }
    // if (values.vehicleTypes) newFilter.vehicleType = values.vehicleTypes
    if (currentMark) newFilter.makes = [currentMark]
    if (currentModel) newFilter.models = [currentModel]
    if (values.engineFrom || values.engineTo) {
      newFilter.engineCapacities = capacityArray(
        values.engineFrom ? values.engineFrom : 0.7,
        values.engineTo ? values.engineTo : 17
      )
      newFilter.includeFilters?.push('engineCapacities')
    }
    if (values.fromYear) newFilter.yearMin = values.fromYear
    if (values.toYear) newFilter.yearMax = values.toYear
    if (values.fuelTypes) newFilter.fuelType = values.fuelTypes
    if (!Number.isNaN(+values.odometerMin) && values.odometerMax != '')
      newFilter.odometerMin = +values.odometerMin
    if (!Number.isNaN(+values.odometerMax) && values.odometerMax != '')
      newFilter.odometerMax = +values.odometerMax

    if (values.transmission) newFilter.transmissionTypes = [values.transmission]

    setFilter(newFilter)
    setOpen(false)
    document.body.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={open ? `filter-full filter-full--open` : 'filter-full'}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="filter-full__back"
      >
        Вернуться к каталогу <RightArrowSVG />
      </button>
      <Formik
        initialValues={{
          // vehicleTypes: vehicle,
          bodyStyles: bodyStyle,
          fromYear: '',
          toYear: '',
          transmission: '',
          engineFrom: '',
          engineTo: '',
          makes: '',
          fuelTypes: '',
          models: '',
          odometerMin: '',
          odometerMax: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>


          <div className="filter-full__transmission">
            <h3 className="filter-full__title">Марка</h3>
            <Field
              name={'makes'}
              component={SelectMake}
              options={makes || marks}
              placeholder="Все"
              setter={setCurrentMark}
            />
          </div>
          {!isLoading && currentMark && (
            <div className="filter-full__transmission">
              <h3 className="filter-full__title">Модель</h3>
              <Field
                name={'models'}
                component={SelectMake}
                options={models}
                placeholder="Все"
                setter={setCurrentModel}
              />
            </div>
          )}
          {currentModel && bodyStyles.length > 0 && (
            <div className="filter-full__transmission">
              <h3 className="filter-full__title">Тип кузова</h3>
              <Field
                name={'bodyStyle'}
                component={SelectMake}
                options={bodyStyles.map((val) => ({
                  label: val,
                  value: val,
                }))}
                placeholder="Все"
                setter={setBodyStyle}
              />
            </div>
          )}
          <div className="filter-full__year">
            <h3 className="filter-full__title">Рік</h3>
            <Field
              name={'fromYear'}
              component={CustomSelect}
              options={firstYears}
              placeholder="c"
              setYear={setFromYear}
            />
            <Field
              name={'toYear'}
              component={CustomSelect}
              options={secondYears}
              placeholder="по"
              setYear={setToYear}
            />
          </div>
          <div className="filter-full__transmission">
            <h3 className="filter-full__title">Коробка передач</h3>
            <Field
              name={'transmission'}
              component={SelectTransmission}
              options={transmissions}
              placeholder="Все"
            />
          </div>
          <div className="filter-full__gas">
            <h3 className="filter-full__title">Тип палива</h3>
            <Field
              name={'gas'}
              component={SelectTransmission}
              options={gas}
              placeholder="Все"
            />
          </div>
          <div className="filter-full__engine">
            <h3 className="filter-full__title">Об’єм двигуна</h3>
            <div className="filter-full__engine-input">
              <Field placeholder="Прим. 1.1" type="number" name="engineForm" />
              <EngineSVG />
            </div>
            <div className="filter-full__engine-input">
              <Field placeholder="Прим. 2" type="number" name="engineTo" />
              <EngineSVG />
            </div>
          </div>
          <div className="filter-full__engine">
            <h3 className="filter-full__title">Пробіг</h3>
            <div className="filter-full__engine-input">
              <Field placeholder="Пр. 10000" type="number" name="odometerMin" />
              <SpeedSVG />
            </div>
            <div className="filter-full__engine-input">
              <Field placeholder="Пр. 50000" type="number" name="odometerMax" />
              <SpeedSVG />
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="filter-full__button"
          >
            Применить фильтр
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default FilterFull
