import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Formik, Field, Form } from 'formik'
// import CustomSelect from './CustomSelect'
import Spinner from '../Spinner/Spinner'
import SelectTransmission from './SelectTransmission'
import Accordion from '../Accordion/Accordion'
// SVG
import EngineSVG from '../../assets/svg/engine.svg'
import SpeedSVG from '../../assets/svg/speed.svg'
// import FilterSVG from '../../assets/svg/filter_1.svg'
import CloseSVG from '../../assets/svg/times.svg'
// Constants
import {
  years,
  gas,
  transmissions,
  driveLineTypes,
  condition,
} from '../../constants/filter'
import { acceptedBodyStyles } from '../../constants/bodyStyles'
import carFeatures from '../../constants/carFeatures'
// Types
import { FilterTableProps } from './Types'
import SelectMake from './SelectMake'
import { useDispatch, useSelector } from 'react-redux'
// import { vehicleTypes } from '../../constants/filter'

import { updateOptionsTree } from '../../../store/actions/optionsTree'
import axios from 'axios'
import { updateDate } from '../../../store/actions/updateDate'

const FilterTable: React.FC<FilterTableProps> = ({
  loading,
  filter,
  transport,
  mobileActive,
}): JSX.Element => {
  // const [activeMobFilter, setActiveMobFilter] = useState<boolean>(false)
  // const [vehicle, setVehicle] = useState<string>(filter.vehicleType || '')

  const dispatchRedux = useDispatch()
  const optionsTree = useSelector(
    (state: any) => state.optionsTree.optionsTree ?? []
  )
  const updatedDate = useSelector((state: any) => state.updatedDate.updatedDate)
  const timeToUpdate = 86400000 /* one day */

  const [fromYear, setFromYear] = useState<number>(0)
  const [toYear, setToYear] = useState<number>(2021)
  const [marks, setMarks] = useState()
  const [bodyStyles, setBodyStyles] = useState<any>([])
  const [bodyStyle, setBodyStyle] = useState(
    filter.bodyTypes?.length ? filter.marks[0] : ''
  )
  const [currentMark, setCurrentMark] = useState<string>(
    filter.makes?.length ? filter.makes[0] : ''
  )
  const [currentModel, setCurrentModel] = useState<string>(
    filter.models?.length ? filter.models[0] : ''
  )

  const [models, setModels] = useState<any>([{ label: '', value: '' }])
  const [isLoading, setLoading] = useState(false)

  const mobileActiveBoolean = !!mobileActive ? mobileActive : false

  const [activeMobFilter, setActiveMobFilter] =
    useState<boolean>(mobileActiveBoolean)

  useEffect(() => {
    setActiveMobFilter(mobileActiveBoolean)
  }, [mobileActive])

  const filterPrimaryDamage = (carFeatures: any) => {
    const filteredDamages = carFeatures.filter((v: any) => {
      return v.id >= 58 && v.id <= 83
    })

    const mappedDamages = filteredDamages.map((v: any) => {
      return {
        label: v.ua,
        value: v.eng,
      }
    })

    return mappedDamages
  }

  const router = useRouter()

  const firstYears = years.filter((year) => year.value < toYear)
  const secondYears = years.filter((year) => year.value > fromYear)

  // const handleVehicle = (e: React.MouseEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement
  //   setVehicle(target.value)
  // }

  const filterBodyStyles = (bodyStyles: string[]) => {
    const filteredBodyStyles = bodyStyles.filter((bv: string) => {
      const acceptedBodyStylesEn = acceptedBodyStyles.map((av: any) => av.en)
      return acceptedBodyStylesEn.includes(bv)
    })

    const mapedBodyStyles = filteredBodyStyles.map((fv: string) => {
      const label = acceptedBodyStyles.filter((av: any) => av.en == fv)[0].ua

      return {
        value: fv,
        label: label,
      }
    })

    return mapedBodyStyles
  }

  useEffect(() => {
    setCurrentMark(() => (filter.makes?.length ? filter.makes[0] : ''))
    setCurrentModel(() => (filter.models?.length ? filter.models[0] : ''))
  }, [filter])

  const getMarks = async () => {
    setLoading(true)
    const url = `/api/filter`

    if (Date.now() - updatedDate > timeToUpdate) {
      dispatchRedux(updateOptionsTree([]))
    }
    if (optionsTree.length > 0) {
      setMarks(
        optionsTree.map((val: any) => ({
          label: val.title,
          value: val.title,
        }))
      )
    } else {
      try {
        const response = await axios.get(url)
        if (response.status == 200) {
          const filteredData = response.data.filter(
            (item: any) => item.models.length > 0
          )
          const parsedMarks = filteredData.map((i: any) => i.title)
          const parsedBodystyles = filteredData.map((i: any) => i.bodyStyles)

          setMarks(
            parsedMarks.sort().map((val: string) => ({
              label: val,
              value: val,
            }))
          )
          setBodyStyles(filterBodyStyles(parsedBodystyles[0].sort()))

          dispatchRedux(updateOptionsTree([...filteredData]))
          dispatchRedux(updateDate(Date.now()))
        }
      } catch (error) {
        setMarks(undefined)
      }
    }

    setLoading(false)
  }

  const getModels = async () => {
    setLoading(true)
    setCurrentModel('')

    const currentMarkIndex = optionsTree.findIndex(
      (item: any) => item.title == currentMark
    )
    setModels(
      optionsTree[currentMarkIndex].models.map((val: any) => ({
        label: val.title,
        value: val.title,
      }))
    )

    setBodyStyles(filterBodyStyles(optionsTree[currentMarkIndex].bodyStyles))

    setLoading(false)
  }

  const getBodystyles = async () => {
    setLoading(true)
    const currentMarkIndex = optionsTree.findIndex(
      (item: any) => item.title == currentMark
    )
    const currentModelIndex = optionsTree[currentMarkIndex]?.models.findIndex(
      (item: any) => item.title == currentModel
    )

    if (
      optionsTree[currentMarkIndex].models[currentModelIndex].bodyStyles
        .length > 0
    ) {
      setBodyStyles([])
      setBodyStyle('')

      setBodyStyles(
        filterBodyStyles(
          optionsTree[currentMarkIndex].models[currentModelIndex].bodyStyles
        )
      )
    }

    setLoading(false)
  }

  useEffect(() => {
    getMarks()
  }, [])

  useEffect(() => {
    if (currentMark) {
      getModels()
    }
    console.log(bodyStyles)
  }, [currentMark])

  useEffect(() => {
    if (currentModel) {
      getBodystyles()
    }
  }, [currentModel])

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
          'primaryDamage',
          // 'secondaryDamage',
          'condition',
        ].includes(k) && values[k]
    )

    const url: any = []

    if (values.makes) url.push(`make=${values.makes}`)
    if (values.models) url.push(`model=${values.models}`)
    if (values.fuelTypes) url.push(`fuel=${values.fuelTypes}`)
    if (values.engineFrom) url.push(`engineFrom=${values.engineFrom}`)
    if (values.engineTo) url.push(`engineTo=${values.engineTo}`)
    if (values.fromYear) url.push(`yearStart=${values.fromYear}`)
    if (values.toYear) url.push(`yearEnd=${values.toYear}`)
    if (values.odometerMin) url.push(`mileageStart=${values.odometerMin}`)
    if (values.odometerMax) url.push(`mileageEnd=${values.odometerMax}`)
    if (values.primaryDamage) url.push(`damageTypes=${values.primaryDamage}`)
    if (values.transmission)
      url.push(`transmissionTypes=${values.transmission}`)
    if (values.saleDocumentsGroups)
      url.push(`saleDocumentsGroups-is-${values.saleDocumentsGroups}`)
    if (values.sellerType) url.push(`sellerType=${values.sellerType}`)
    if (values.bodyStyle) url.push(`bodyStyles=${values.bodyStyle}`)
    if (values.condition) url.push(`condition=${values.condition}`)
    if (values.driveLineTypes)
      url.push(`driveLineTypes=${values.driveLineTypes}`)
    if (url.length > 0) {
      router.push('/catalog?' + url.join('&'))
    }
  }

  const toggleFilter = () => {
    const mobileFilterBtn = window.document.getElementsByClassName(
      'mobile-filter-btn'
    )[0] as HTMLElement
    mobileFilterBtn.click()
  }

  const resetFilters = () => {
    router.push('/catalog')
    setActiveMobFilter(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))
    router.events.on('routeChangeError', () => setLoading(false))

    return () => {
      router.events.off('routeChangeStart', () => setLoading(true))
      router.events.off('routeChangeComplete', () => setLoading(false))
      router.events.off('routeChangeError', () => setLoading(false))
    }
  })

  return (
    <div className="filter-full--table">
      <div className={`filter-spinner${isLoading ? ' loading' : ''}`}>
        <Spinner />
      </div>

      <Formik
        initialValues={{
          bodyStyles: bodyStyle ?? '',
          fromYear: filter.yearMin ?? '',
          toYear: filter.yearMax ?? '',
          sellerType: filter.sellerType ?? '',
          transmission: filter.transmissionTypes
            ? filter.transmissionTypes[0]
            : '',
          engineFrom: filter.engineCapacities ? filter.engineCapacities[0] : '',
          engineTo: filter.engineCapacities
            ? parseFloat(
                filter.engineCapacities[filter.engineCapacities.length - 1]
              ) + 0.1
            : '',
          makes: currentMark,
          fuelTypes: filter.fuelTypes ? filter.fuelTypes[0] : '',
          models: currentModel,
          odometerMin: filter.odometerMin ?? '',
          odometerMax: filter.odometerMax ?? '',
          vehicleConditions: filter.vehicleConditions
            ? filter.vehicleConditions[0]
            : '',
          driveLineTypes: filter.driveLineTypes ? filter.driveLineTypes[0] : '',
          primaryDamage: filter.damageTypes ? filter.damageTypes[0] : '',
          // secondaryDamage: '',
          condition: filter.vehicleConditions
            ? filter.vehicleConditions[0]
            : '',
        }}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form className={activeMobFilter ? `active-mobile` : ``}>
          <button
            onClick={resetFilters}
            disabled={loading}
            type="button"
            className="filter-full__button reset-filters"
          >
            Скинути фільтр
          </button>

          <button
            type="button"
            className="mobile-filter-btn--close"
            onClick={toggleFilter}
          >
            <CloseSVG />
          </button>

          <div className="filter-full--table-wrap">
            <Accordion title="Рік">
              <div className="filter-full__year">
                <Field
                  name={'fromYear'}
                  component={SelectTransmission}
                  filter="yearStart"
                  transport={transport}
                  options={firstYears}
                  placeholder="з"
                  setter={setFromYear}
                />
                <Field
                  name={'toYear'}
                  component={SelectTransmission}
                  filter="yearEnd"
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
                  name="makes"
                  value={currentMark}
                  filter="brand"
                  transport={transport}
                  component={SelectMake}
                  options={marks}
                  placeholder="Всі"
                  setter={setCurrentMark}
                />
              </div>
            </Accordion>
            <Accordion title="Модель" isOpenInner={true}>
              <div className="filter-full__transmission">
                <Field
                  name="models"
                  value={currentModel}
                  filter="model"
                  transport={transport}
                  component={SelectMake}
                  options={models}
                  placeholder="Всі"
                  setter={setCurrentModel}
                />
              </div>
            </Accordion>
            <Accordion title="Коробка передач">
              <div className="filter-full__transmission">
                <Field
                  name="transmission"
                  component={SelectTransmission}
                  options={transmissions}
                  placeholder="Оберіть вашу коробку"
                />
              </div>
            </Accordion>
            <Accordion title="Тип палива">
              <div className="filter-full__gas">
                <Field
                  name={'fuelTypes'}
                  filter="fuel"
                  component={SelectTransmission}
                  options={gas}
                  placeholder="Оберіть тип палива"
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
                    step="any"
                    min="0"
                  />
                  <EngineSVG />
                </div>
                <div className="filter-full__engine-input">
                  <Field
                    placeholder="До"
                    type="number"
                    name="engineTo"
                    step="any"
                    min="0"
                  />
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
            <Accordion title="Стан">
              <div className="filter-full__transmission">
                <Field
                  name={'condition'}
                  component={SelectTransmission}
                  options={condition}
                  placeholder="Оберіть стан"
                />
              </div>
            </Accordion>
            <Accordion title="Тип кузова">
              <div className="filter-full__transmission">
                <Field
                  name={'bodyStyle'}
                  component={SelectTransmission}
                  options={bodyStyles}
                  placeholder="Всі"
                  setter={setBodyStyle}
                />
              </div>
            </Accordion>
            <Accordion title="Тип привода">
              <div className="filter-full__transmission">
                <Field
                  name={'driveLineTypes'}
                  component={SelectTransmission}
                  options={driveLineTypes}
                  placeholder="Оберіть тип привода"
                  filter="driveLineTypes"
                />
              </div>
            </Accordion>
            <Accordion title="Продавець">
              <div className="filter-full__year">
                <label>
                  <Field type="radio" name="sellerType" value="insurance" />{' '}
                  Страхова
                </label>
                <label>
                  <Field type="radio" name="sellerType" value="other" /> Перекуп
                </label>
              </div>
            </Accordion>
            <Accordion title="Пошкодження">
              <div className="filter-full__transmission">
                <Field
                  name={'primaryDamage'}
                  component={SelectTransmission}
                  options={filterPrimaryDamage(carFeatures)}
                  placeholder="Оберіть пошкодження"
                  filter="primaryDamage"
                />
              </div>
            </Accordion>
            {/* <Accordion title="Другорядне пошкодження">
              <div className="filter-full__transmission">
                <Field
                  name={'secondaryDamage'}
                  component={SelectTransmission}
                  filter='secondaryDamage'
                  options={secondaryDamage}
                  placeholder="Оберіть пошкодження"
                />
              </div>
            </Accordion> */}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="filter-full__button"
          >
            Застосувати фільтр
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default FilterTable
