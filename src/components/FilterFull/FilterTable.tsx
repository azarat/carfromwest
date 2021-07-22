import { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import CustomSelect from './CustomSelect'
import SelectTransmission from './SelectTransmission'
import Accordion from '../Accordion/Accordion'
// SVG
import EngineSVG from '../../assets/svg/engine.svg'
import SpeedSVG from '../../assets/svg/speed.svg'
// Constants
import { years, gas, transmissions } from '../../constants/filter'
// Types
import { FilterTableProps, IFilter } from './Types'
import SelectMake from './SelectMake'
import { capacityArray } from '../../helpers/calculator'
import { vehicleTypes } from '../../constants/filter'

const FilterTable: React.FC<FilterTableProps> = ({
  setFilter,
  loading,
  filter,
  setPage,
}): JSX.Element => {
  const [vehicle, setVehicle] = useState<string>(filter.vehicleType || '')
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

  const handleVehicle = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setVehicle(target.value)
  }

  useEffect(() => {
    const url = `/api/filter?filters=makes&vehicleType=${vehicle}`
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
  }, [vehicle])

  useEffect(() => {
    if (currentMark) {
      setLoading(true)
      setCurrentModel('')
      setBodyStyles([])
      setBodyStyle('')
      const url = `/api/filter?filters=makes,models&vehicleType=${vehicle}&makes=${currentMark}`
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
  }, [vehicle, currentMark])

  useEffect(() => {
    if (currentModel) {
      setBodyStyles([])
      setBodyStyle('')
      const url = `/api/filter?filters=makes,models,bodyStyles&vehicleType=${vehicle}&makes=${currentMark}&models=${currentModel}`
      fetch(url)
        .then((res) => res.json())
        .then((json) => setBodyStyles(json?.bodyStyles.sort()))
        .catch(() => {
          setBodyStyles([])
          setBodyStyle('')
        })
    }
  }, [vehicle, currentMark, currentModel])

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
          'vehicleTypes',
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
    if (values.vehicleTypes) newFilter.vehicleType = values.vehicleTypes
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

    if (!Number.isNaN(+values.odometerMin) && values.odometerMax != '')
      newFilter.odometerMin = +values.odometerMin
    if (!Number.isNaN(+values.odometerMax) && values.odometerMax != '')
      newFilter.odometerMax = +values.odometerMax

    if (values.transmission) newFilter.transmissionTypes = [values.transmission]

    setFilter(newFilter)
    setPage(1)
    document.body.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="filter-full--table">
      <Formik
        initialValues={{
          vehicleTypes: vehicle,
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
          <Accordion title="Транспорт">
            <div className="filter-full__vehicle">
              {vehicleTypes.map(({ title, value, ...restProps }) => (
                <div key={title} className="filter-full__vehicle-item">
                  <Field
                    onClick={handleVehicle}
                    value={value}
                    name="vehicleTypes"
                    id={`table-${value}`}
                    type="radio"
                  />
                  <label htmlFor={`table-${value}`}>
                    <restProps.icon />
                    {title}
                  </label>
                </div>
              ))}
            </div>
          </Accordion>

          {vehicle !== '' && (
            <Accordion title="Марка">
              <div className="filter-full__transmission">
                <Field
                  name={'makes'}
                  component={SelectMake}
                  options={marks}
                  placeholder="Все"
                  setter={setCurrentMark}
                />
              </div>
            </Accordion>
          )}

          {!isLoading && currentMark && (
            <Accordion title="Модель">
              <div className="filter-full__transmission">
                <Field
                  name={'models'}
                  component={SelectMake}
                  options={models}
                  placeholder="Все"
                  setter={setCurrentModel}
                />
              </div>
            </Accordion>
          )}
          {bodyStyles.length > 0 && currentMark && (
            <Accordion title="Тип кузова">
              <div className="filter-full__transmission">
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
            </Accordion>
          )}

          <Accordion title="год">
            <div className="filter-full__year">
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
          </Accordion>
          <Accordion title="Коробка передач">
            <div className="filter-full__transmission">
              <Field
                name="transmission"
                component={SelectTransmission}
                options={transmissions}
                placeholder="Все"
              />
            </div>
          </Accordion>
          <Accordion title="Тип топлива">
            <div className="filter-full__gas">
              <Field
                name={'fuelTypes'}
                component={SelectTransmission}
                options={gas}
                placeholder="Все"
              />
            </div>
          </Accordion>
          <Accordion title="Объем двигателя (л)">
            <div className="filter-full__engine">
              <div className="filter-full__engine-input">
                <Field
                  placeholder="Прим. 1.1"
                  type="number"
                  name="engineFrom"
                />
                <EngineSVG />
              </div>
              <div className="filter-full__engine-input">
                <Field placeholder="Прим. 2" type="number" name="engineTo" />
                <EngineSVG />
              </div>
            </div>
          </Accordion>
          <Accordion title="Пробег (миль)">
            <div className="filter-full__engine">
              <div className="filter-full__engine-input">
                <Field
                  placeholder="Пр. 10000"
                  type="number"
                  name="odometerMin"
                />
                <SpeedSVG />
              </div>
              <div className="filter-full__engine-input">
                <Field
                  placeholder="Пр. 50000"
                  type="number"
                  name="odometerMax"
                />
                <SpeedSVG />
              </div>
            </div>
          </Accordion>
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

export default FilterTable
