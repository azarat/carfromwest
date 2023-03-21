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
// import { acceptedBodyStyles } from '../../constants/bodyStyles'
import carFeatures from '../../constants/carFeatures'
// Types
import { FilterTableProps } from './Types'
import SelectMake from './SelectMake'
import { useDispatch, useSelector } from 'react-redux'

import { updateOptionsTree } from '../../../store/actions/optionsTree'
import axios from 'axios'
import { updateDate } from '../../../store/actions/updateDate'

const FilterTable: React.FC<FilterTableProps> = ({
  loading,
  transport,
  mobileActive,
}): JSX.Element => {
  const router = useRouter()
  const dispatchRedux = useDispatch()
  const optionsTree = useSelector(
    (state: any) => state.optionsTree.optionsTree ?? []
  )
  const updatedDate = useSelector((state: any) => state.updatedDate.updatedDate)
  const timeToUpdate = 86400000 /* one day */

  const [fromYear, setFromYear] = useState<number>(0)
  const [toYear, setToYear] = useState<number>(2023)
  const [makes, setMakes] = useState([])
  const [bodyStyles, setBodyStyles] = useState<any>([])
  const [, setBodyStyle] = useState('')
  const [currentMake, setCurrentMake] = useState<string>('')
  const [currentModel, setCurrentModel] = useState<string>('')
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

  const firstYears = years.filter((year) => year.value < toYear)
  const secondYears = years.filter((year) => year.value > fromYear)

  // const filterBodyStyles = (bodyStyles: string[]) => {
  //   const filteredBodyStyles = bodyStyles?.filter((bv: string) => {
  //     const acceptedBodyStylesEn = acceptedBodyStyles?.map((av: any) => av.en)
  //     return acceptedBodyStylesEn.includes(bv)
  //   })

  //   const mapedBodyStyles = filteredBodyStyles?.map((fv: string) => {
  //     const label = acceptedBodyStyles?.filter((av: any) => av.en == fv)[0].ua

  //     return {
  //       value: fv,
  //       label: label,
  //     }
  //   })

  //   return mapedBodyStyles
  // }

  const getMakes = async () => {
    setLoading(true)
    const url = `/api/filter/makes`

    if (Date.now() - updatedDate > timeToUpdate) {
      dispatchRedux(updateOptionsTree([]))
    }

    if (optionsTree.length > 0) {
      setMakes(
        optionsTree.map(
          (item: { make: ''; models: { names: []; bodystyles: [] } }) => ({
            label: item.make,
            value: item.make,
          })
        )
      )
    } else {
      try {
        const response = await axios.get(url)
        if (response.status == 200) {
          setMakes(
            response.data.sort().map((val: string) => ({
              label: val,
              value: val,
            }))
          )

          const updatedMakes = response.data.map((item: string) => ({
            make: item,
            models: { names: [], bodystyles: [] },
          }))

          dispatchRedux(updateOptionsTree([...updatedMakes]))
          dispatchRedux(updateDate(Date.now()))
        }
      } catch (error) {
        setMakes([])
      }
    }

    setLoading(false)
  }

  const getModels = async () => {
    setLoading(true)
    const currentMakeIndex = optionsTree.findIndex(
      (item: { make: ''; models: { names: []; bodystyles: [] } }) =>
        item.make == currentMake
    )

    const url = `/api/filter/models`

    if (Date.now() - updatedDate > timeToUpdate) {
      dispatchRedux(updateOptionsTree([]))
    }
    if (
      optionsTree.length > 0 &&
      optionsTree[currentMakeIndex]?.models?.name?.length > 0
    ) {
      setModels(
        optionsTree[currentMakeIndex]?.models?.name?.map((val: [string]) => ({
          label: val,
          value: val,
        }))
      )
    } else {
      try {
        const response = await axios.post(url, { currentMake })
        if (response.status == 200) {
          setModels(
            response.data.sort().map((val: string) => ({
              label: val,
              value: val,
            }))
          )
          const updatedOptionTree = optionsTree
          updatedOptionTree[currentMakeIndex].models.name = response.data
          dispatchRedux(updateOptionsTree([...updatedOptionTree]))
        }
      } catch (error) {
        setModels([])
      }
    }
    setLoading(false)
  }
  const getBodystyles = async () => {
    setLoading(true)
    const currentMakeIndex = optionsTree.findIndex(
      (item: { make: ''; models: { name: []; bodystyles: [] } }) =>
        item.make == currentMake
    )
    // const currentModelIndex = optionsTree[
    //   currentMakeIndex
    // ]?.models.name.findIndex((item: string) => item == currentModel)

    if (Date.now() - updatedDate > timeToUpdate) {
      dispatchRedux(updateOptionsTree([]))
    }
    if (
      optionsTree.length > 0 &&
      optionsTree[currentMakeIndex]?.models?.bodystyles?.length > 0
    ) {
      setBodyStyles(
        optionsTree[currentMakeIndex]?.models?.bodystyles?.map((val: string) => ({
          label: val,
          value: val,
        }))
      )
    } else {
      try {
        const url = `/api/filter/bodystyles`

        const response = await axios.post(url, { currentModel })

        if (response.status == 200) {
          setBodyStyles(
            response.data.sort().map((val: string) => ({
              label: val,
              value: val,
            }))
          )
          const updatedOptionTree = optionsTree
          updatedOptionTree[currentMakeIndex].models.bodystyles = response.data
          dispatchRedux(updateOptionsTree([...updatedOptionTree]))
        }
      } catch (error) {
        setBodyStyles([])
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    getMakes()
  }, [router.query.make])

  useEffect(() => {
    if (currentMake) {
      getModels()
    }
  }, [currentMake])

  useEffect(() => {
    if (currentMake) {
      getBodystyles()
    }
  }, [currentMake])

  const handleSubmit = (values: any) => {
    const url = Object.entries(values)
      .filter((i) => i[1])
      .map((i) => i.join('='))
      .join(`&`)

    router.push('/catalog?' + url)
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
          bodyStyle: router.query.bodyStyle ?? '',
          yearStart: Number(router.query.yearStart) ?? '',
          toYear: Number(router.query.toYear) ?? '',
          sellerType: router.query.sellerType ?? '',
          transmissionType: router.query.transmissionType ?? '',
          engineFrom: router.query.engineFrom ?? '',
          engineTo: router.query.engineTo ?? '',
          make: router.query.make ?? '',
          fuelType: router.query.fuelType ?? '',
          model: router.query.model ?? '',
          odometerMin: router.query.odometerMin ?? '',
          odometerMax: router.query.odometerMax ?? '',
          driveLineType: router.query.driveLineType ?? '',
          primaryDamage: router.query.primaryDamage ?? '',
          condition: router.query.condition ?? '',
        }}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue }) => {
          return (
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
                      name={'yearStart'}
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
                      name="make"
                      value={currentMake}
                      filter="brand"
                      onChange={() => {
                        setFieldValue('model', '')
                        setCurrentModel('')
                      }}
                      transport={transport}
                      component={SelectMake}
                      options={makes}
                      placeholder="Всі"
                      setter={setCurrentMake}
                    />
                  </div>
                </Accordion>
                <Accordion title="Модель" isOpenInner={true}>
                  <div className="filter-full__transmission">
                    <Field
                      name="model"
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
                      name="transmissionType"
                      component={SelectTransmission}
                      options={transmissions}
                      placeholder="Оберіть вашу коробку"
                    />
                  </div>
                </Accordion>
                <Accordion title="Тип палива">
                  <div className="filter-full__gas">
                    <Field
                      name={'fuelType'}
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
                      name={'driveLineType'}
                      component={SelectTransmission}
                      options={driveLineTypes}
                      placeholder="Оберіть тип привода"
                      filter="driveLineTypes"
                    />
                  </div>
                </Accordion>
                {/* <Accordion title="Продавець">
                  <div className="filter-full__year">
                    <label>
                      <Field type="radio" name="sellerType" value="insurance" />
                      {''}
                      Страхова
                    </label>
                    <label>
                      {''}
                      <Field
                        type="radio"
                        name="sellerType"
                        value="other"
                      />{' '}
                      Перекуп
                    </label>
                  </div>
                </Accordion> */}
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
          )
        }}
      </Formik>
    </div>
  )
}

export default FilterTable
