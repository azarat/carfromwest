import { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import CustomSelect from './CustomSelect'
import SelectTransmission from './SelectTransmission'
import Accordion from '../Accordion/Accordion'
// SVG
import EngineSVG from '../../assets/svg/engine.svg'
import SpeedSVG from '../../assets/svg/speed.svg'
// Constants
import {
  years,
  gas,
  transmissions,
  vehicleTypes,
  bodyTypeArray,
} from '../../constants/filter'
// Types
import { FilterTableProps } from './Types'
import SelectMake from './SelectMake'

const FilterTable: React.FC<FilterTableProps> = ({
  setFilter,
  loading,
  filter,
  setPage,
}): JSX.Element => {
  const [vehicle, setVehicle] = useState<string>('AM')
  const [fromYear, setFromYear] = useState<number>(0)
  const [toYear, setToYear] = useState<number>(2021)
  const [marks, setMarks] = useState()
  const [bodyStyle, setBodyStyle] = useState('')
  const [currentMark, setCurrentMark] = useState<string>()
  const [currentModel, setCurrentModel] = useState<string>()
  const [models, setModels] = useState()
  const [isLoading, setLoading] = useState(false)

  const firstYears = years.filter((year) => year.value < toYear)
  const secondYears = years.filter((year) => year.value > fromYear)

  const handleVehicle = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setVehicle(target.value)
  }

  useEffect(() => {
    const url = `/api/filter?filters=makes&type=${vehicle}`
    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        setMarks(
          json?.data.attributes.makes.sort().map((val: string) => ({
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
      setCurrentModel(undefined)
      const url = `/api/filter?filters=models&type=${vehicle}&make=${currentMark}`
      fetch(url)
        .then((res) => res.json())
        .then((json) =>
          setModels(
            json?.data.attributes.models.sort().map((val: string) => ({
              label: val,
              value: val,
            })) || []
          )
        )
        .catch(() => setModels(undefined))
        .finally(() => setLoading(false))
    }
  }, [vehicle, currentMark])

  const handleSubmit = (values: any) => {
    setFilter({
      ...filter,
      type: values['transport-type'],
      makes: currentMark,
      models: currentModel,
      yearMin: +values.fromYear,
      yearMax: +values.toYear,
      transmissionTypes: values.transmission,
      fuelTypes: values.gas,
      engine_min: +values.engineFrom,
      engine_max: +values.engineTo,
      odometerMin: +values.odometerMin,
      odometerMax: +values.odometerMax,
      bodyStyles: bodyStyle,
    })
    setPage(1)
    document.body.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="filter-full--table">
      <Formik
        initialValues={{
          'transport-type': '',
          'body-style': '',
          fromYear: '',
          toYear: '',
          transmission: '',
          engineFrom: '',
          engineTo: '',
          make: '',
          gas: '',
          model: '',
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
                    name="transport-type"
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
          <Accordion title="Тип кузова">
            <div className="filter-full__transmission">
              <Field
                name={'bodyStyle'}
                component={SelectMake}
                options={bodyTypeArray.map((val) => ({
                  label: val,
                  value: val,
                }))}
                placeholder="Все"
                setter={setBodyStyle}
              />
            </div>
          </Accordion>
          {vehicle !== '' && (
            <Accordion title="Марка">
              <div className="filter-full__transmission">
                <Field
                  name={'make'}
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
                  name={'model'}
                  component={SelectMake}
                  options={models}
                  placeholder="Все"
                  setter={setCurrentModel}
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
                name={'gas'}
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
