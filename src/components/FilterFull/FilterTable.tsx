import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Formik, Field, Form } from 'formik'
// import CustomSelect from './CustomSelect'
import SelectTransmission from './SelectTransmission'
import Accordion from '../Accordion/Accordion'
// SVG
import EngineSVG from '../../assets/svg/engine.svg'
import SpeedSVG from '../../assets/svg/speed.svg'
// import FilterSVG from '../../assets/svg/filter_1.svg'
import CloseSVG from '../../assets/svg/times.svg'
// Constants
import { years, gas, transmissions } from '../../constants/filter'
// Types
import { FilterTableProps } from './Types'
import SelectMake from './SelectMake'
// import { vehicleTypes } from '../../constants/filter'

const FilterTable: React.FC<FilterTableProps> = ({
  loading,
  filter,
  makes,
  transport,
  brandModels,
  mobileActive
}): JSX.Element => {
  // const [activeMobFilter, setActiveMobFilter] = useState<boolean>(false)
  // const [vehicle, setVehicle] = useState<string>(filter.vehicleType || '')
  const [fromYear, setFromYear] = useState<number>(0)
  const [toYear, setToYear] = useState<number>(2021)
  const [marks, setMarks] = useState()
  const [bodyStyles, setBodyStyles] = useState<string[]>([])
  const [bodyStyle, setBodyStyle] = useState(
    filter.bodyTypes?.length ? filter.marks[0] : ''
  )
  const [currentMark, setCurrentMark] = useState<string>(
    filter.makes?.length ? filter.makes[0] : ''
  )
  const [currentModel, setCurrentModel] = useState<string>(
    filter.models?.length ? filter.models[0] : ''
  )

  const [models, setModels] = useState()
  const [isLoading, setLoading] = useState(false)
  console.log(isLoading);
  console.log(bodyStyles);
  

  const router = useRouter()

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
    console.log('currentMark', currentMark);
    
    
    if (currentMark && !currentModel) {
      setLoading(true)
      setBodyStyles([])
      setBodyStyle('')
      const url = `/api/filter?filters=makes,models&makes=${currentMark}`
      fetch(url)
        .then((res) => res.json())
        .then((json) => setModels(
            json?.models.sort().map((val: string) => ({
              label: val,
              value: val,
            })) || []
          )
        )
        .catch(() => setModels(undefined))
        .finally(() => setLoading(false))
    }

    if (currentModel) {
      setBodyStyles([])
      setBodyStyle('')
      const url = `/api/filter?filters=makes,models,bodyStyles&makes=${currentMark}&models=${currentModel}`
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          setModels(
            json?.models.sort().map((val: string) => ({
              label: val,
              value: val,
            })) || []
          )          
          setBodyStyles(json?.bodyStyles.sort())
        })
        .catch(() => {
          setBodyStyles([])
          setBodyStyle('')
        })
    }
  }, [currentMark, currentModel])

  const handleSubmit = (values: any) => {
    Object.keys(values).filter(
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
          'locations',
          'vehicleConditions',
          'features',
          'countries',
        ].includes(k) && values[k]
    )

    let url = '';
    if (values.makes) url += `/brand-is-${values.makes}`
    if (values.fuelTypes) url += `/fuel-is-${values.fuelTypes}`
    if (values.models) url += `/model-is-${values.models}`
    if (values.engineFrom && values.engineTo) url += `/volume-is-${values.engineFrom}to${values.engineTo}`
    if (values.fromYear) url += `/yearStart-is-${values.fromYear}`
    if (values.toYear) url += `/yearEnd-is-${values.toYear}`
    if (values.odometerMin) url += `/mileageStart-is-${values.odometerMin}`
    if (values.odometerMax) url += `/mileageEnd-is-${values.odometerMax}`
    router.push('/catalog' + url)
  }

  const toggleFilter = () => {
    const mobileFilterBtn = window.document.getElementsByClassName('mobile-filter-btn')[0] as HTMLElement;
    mobileFilterBtn.click();
  }

  return (
    <div className="filter-full--table">
      <Formik
        initialValues={{
          bodyStyles: bodyStyle,
          fromYear: '',
          toYear: '',
          transmission: '',
          engineFrom: '',
          engineTo: '',
          makes: currentMark,
          fuelTypes: '',
          models: currentModel,
          odometerMin: '',
          odometerMax: '',
        }}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form className={(!!mobileActive && mobileActive == true) ? `active-mobile` : ``}>

          <button type='button' className='mobile-filter-btn--close' onClick={toggleFilter}>
            <CloseSVG />
          </button>

          <div className='filter-full--table-wrap'>
            <Accordion title="Рік">
              <div className="filter-full__year">
                <Field
                  name={'fromYear'}
                  component={SelectTransmission}
                  filter='yearStart'
                  transport={transport}
                  options={firstYears}
                  placeholder="з"
                  setter={setFromYear}
                  
                />
                <Field
                  name={'toYear'}
                  component={SelectTransmission}
                  filter='yearEnd'
                  transport={transport}
                  options={secondYears}
                  placeholder="по"
                  setter={setToYear}
                />
              </div>
            </Accordion>

            <Accordion title="Марка" isOpenInner={true}>
              <div className="filter-full__transmission">
                <Field
                  name='makes'
                  value={currentMark}
                  filter='brand'
                  transport={transport}
                  component={SelectMake}
                  options={makes?.length ? makes?.map((mark) => ({
                    label: mark,
                    value: mark,
                  })) : marks}
                  placeholder="Всі"
                  setter={setCurrentMark}
                />
              </div>
            </Accordion>

            <Accordion title="Модель" isOpenInner={true}>
              <div className="filter-full__transmission">
                <Field
                  name='models'
                  value={currentModel}
                  filter='model'
                  transport={transport}
                  component={SelectMake}
                  options={brandModels?.length ? brandModels?.map((model) => ({
                    label: model,
                    value: model,
                  })) : models}
                  placeholder="Всі"
                  setter={setCurrentModel}
                />
              </div>
            </Accordion>

            <Accordion title="Тип кузова">
              <div className="filter-full__transmission">
                <Field
                  name={'bodyStyle'}
                  component={SelectTransmission}
                  options={bodyStyles.map((val) => ({
                    label: val,
                    value: val,
                  }))}
                  // options={['sedan'].map(val => ({
                  //     label: val,
                  //     value: val,
                  //   }))}
                  placeholder="Всі"
                  setter={setBodyStyle}
                />
              </div>
            </Accordion>

            <Accordion title="Коробка передач">
              <div className="filter-full__transmission">
                <Field
                  name="transmission"
                  component={SelectTransmission}
                  options={transmissions}
                  placeholder="Всі"
                />
              </div>
            </Accordion>
            <Accordion title="Тип палива">
              <div className="filter-full__gas">
                <Field
                  name={'fuelTypes'}
                  component={SelectTransmission}
                  options={gas}
                  placeholder="Всі"
                />
              </div>
            </Accordion>
            <Accordion title="Об’єм двигуна">
              <div className="filter-full__engine">
                <div className="filter-full__engine-input">
                  <Field
                    placeholder="Від"
                    type="number"
                    name="engineFrom"
                    min="0"
                  />
                  <EngineSVG />
                </div>
                <div className="filter-full__engine-input">
                  <Field placeholder="До" type="number" name="engineTo" min="0"/>
                  <EngineSVG />
                </div>
              </div>
            </Accordion>
            <Accordion title="Пробіг">
              <div className="filter-full__engine">
                <div className="filter-full__engine-input">
                  <Field
                    placeholder="Від"
                    type="number"
                    name="odometerMin"
                    min="0"
                  />
                  <SpeedSVG />
                </div>
                <div className="filter-full__engine-input">
                  <Field
                    placeholder="До"
                    type="number"
                    name="odometerMax"
                    min="0"
                  />
                  <SpeedSVG />
                </div>
              </div>
            </Accordion>
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

export default FilterTable
