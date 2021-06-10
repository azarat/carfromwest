import { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik'
import CustomSelect from './CustomSelect'
import SelectTransmission from './SelectTransmission'
// SVG
import RightArrowSVG from '../../assets/svg/right-arrow.svg'
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

import { FilterFullProps } from './Types'
import SelectMake from './SelectMake'

const FilterFull: React.FC<FilterFullProps> = ({
  open,
  setOpen,
  filter,
  setFilter,
  loading,
}): JSX.Element => {
  const [vehicle, setVehicle] = useState<string>('AM')
  const [bodyStyle, setBodyStyle] = useState('')
  const [fromYear, setFromYear] = useState<number>(0)
  const [toYear, setToYear] = useState<number>(2021)
  const [marks, setMarks] = useState()
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
    setOpen(false)
    document.body.scrollIntoView({ behavior: 'smooth' })
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
  }, [vehicle, fromYear, toYear])

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

  useEffect(() => {
    open
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
  }, [open])

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
          'transport-type': '',
          'body-style': '',
          fromYear: '',
          toYear: '',
          transmission: '',
          engineFrom: '',
          engineTo: '',
          make: '',
          model: '',
          odometerMin: '',
          odometerMax: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="filter-full__vehicle">
            <h3 className="filter-full__title">Транспорт</h3>
            {vehicleTypes.map(({ title, value, ...restProps }) => (
              <div key={title} className="filter-full__vehicle-item">
                <Field
                  onClick={handleVehicle}
                  value={value}
                  name="transport-type"
                  id={value}
                  type="radio"
                />
                <label htmlFor={value}>
                  <restProps.icon />
                  {title}
                </label>
              </div>
            ))}
          </div>
          {vehicle === 'AM' && (
            <div className="filter-full__transmission">
              <h3 className="filter-full__title">Тип кузова</h3>
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
          )}

          <div className="filter-full__transmission">
            <h3 className="filter-full__title">Марка автомобиля</h3>
            <Field
              name={'make'}
              component={SelectMake}
              options={marks}
              placeholder="Все"
              setter={setCurrentMark}
            />
          </div>
          {!isLoading && currentMark && (
            <div className="filter-full__transmission">
              <h3 className="filter-full__title">Модель автомобиля</h3>
              <Field
                name={'model'}
                component={SelectMake}
                options={models}
                placeholder="Все"
                setter={setCurrentModel}
              />
            </div>
          )}
          <div className="filter-full__year">
            <h3 className="filter-full__title">год</h3>
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
            <h3 className="filter-full__title">Тип топлива</h3>
            <Field
              name={'gas'}
              component={SelectTransmission}
              options={gas}
              placeholder="Все"
            />
          </div>
          <div className="filter-full__engine">
            <h3 className="filter-full__title">Объем двигателя (л)</h3>
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
            <h3 className="filter-full__title">Пробег (миль)</h3>
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
