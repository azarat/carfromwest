import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Select from 'react-select'
import { Formik, Field, FieldProps, Form } from 'formik'
import { useRouter } from 'next/router'
import Spinner from '../../Spinner/Spinner'
import { years } from '../../../constants/filter'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateDate } from '../../../../store/actions/updateDate'

import { updateOptionsTree } from '../../../../store/actions/optionsTree'

type CustomSelectProps = {
  options: any
  placeholder?: string
  side?: string
  setter?: (e: any) => void
}

const Promo: React.FC = (): JSX.Element => {
  const router = useRouter()
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState<any>([])
  const [currentMake, setCurrentMake] = useState('')
  const [, setCurrentModel] = useState('')
  const [fromYear, setFromYear] = useState<number>(0)
  const [toYear, setToYear] = useState<number>(2023)
  const [isLoading, setLoading] = useState(false)

  const optionsTree = useSelector(
    (state: any) => state.optionsTree.optionsTree ?? []
  )
  const updatedDate = useSelector((state: any) => state.updatedDate.updatedDate)
  const timeToUpdate = 86400000 /* one day */
  const dispatchRedux = useDispatch()
  const firstYears = years.filter((year) => year.value < toYear)
  const secondYears = years.filter((year) => year.value > fromYear)

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
        // console.log(response)
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

  useEffect(() => {
    getMakes()
  }, [])

  useEffect(() => {
    if (currentMake) {
      getModels()
    }
  }, [currentMake])

  const handleSubmit = (values: any) => {
    setLoading(true)

    const url = Object.entries(values)
      .filter((i) => i[1])
      .map((i) => i.join('='))
      .join(`&`)

    router.push('/catalog?' + url)
  }

  // if (typeof window !== 'undefined') {
  //   console.log('prevLink', sessionStorage.getItem('prevLink'))
  //   console.log('initialLink', sessionStorage.getItem('initialLink'))
  // }
  // useEffect(()=>{

  //   // setLoading(false)
  // }, [router.asPath])

  const promoSelect: React.FC<FieldProps & CustomSelectProps> = ({
    field,
    options,
    form,
    placeholder,
    side,
    setter,
  }): JSX.Element => {
    return (
      <Select
        name={field.name}
        options={options}
        placeholder={placeholder}
        onChange={(e) => {
          if (!!setter) setter(e.value)
          form.setFieldValue(field.name, e.value)
        }}
        value={
          options
            ? options.find((option: any) => option.value === field.value)
            : ''
        }
        className={`promo__form-${side}__select`}
      />
    )
  }

  return (
    <>
      <div className="promo">
        <div className="promo__wrapper">
          <div className="promo__wrapper-left">
            <h1 className="promo__title">АВТО ІЗ США</h1>
            <p className="promo__description">
              Бажаєте підібрати найкращий варіант та цікавитесь як заощадити при
              покупці авто з США? Залиште номер телефону і ми розповімо усі
              подробиці!
            </p>
            <Formik
              initialValues={{
                make: '',
                model: '',
                yearStart: '',
                yearEnd: '',
                fromPrice: '',
                toPrice: '',
              }}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              <Form className="promo__form" action="">
                <div
                  className={`filter-spinner valigned${
                    isLoading ? ' loading' : ''
                  }`}
                >
                  <Spinner />
                </div>

                <div className="promo__form__discount">Економія до 40%</div>
                <div className="promo__form-left">
                  <Field
                    name={'make'}
                    component={promoSelect}
                    placeholder={'Марка'}
                    options={makes}
                    side={'left'}
                    setter={setCurrentMake}
                  />

                  <Field
                    name={'model'}
                    component={promoSelect}
                    placeholder={'Модель'}
                    options={models}
                    side={'left'}
                    setter={setCurrentModel}
                  />
                </div>
                <div className="promo__form-right">
                  <div className="promo__form-right-info">
                    <span className={`promo__form-right__select-year`}>
                      Рік
                    </span>

                    <Field
                      name={'yearStart'}
                      component={promoSelect}
                      placeholder={'Від'}
                      options={firstYears}
                      setter={setFromYear}
                      side={'right'}
                    />

                    <Field
                      name={'yearEnd'}
                      component={promoSelect}
                      placeholder={'До'}
                      options={secondYears}
                      setter={setToYear}
                      side={'right'}
                    />
                  </div>
                  {/* <div className="promo__form-right-info">
                  <span className={`promo__form-right__select-price`}>Ціна</span>

                  <Field
                    name={'fromPrice'}
                    component={promoSelect}
                    placeholder={'Від'}
                    options={options}
                    side={'right'}
                    />

                  <Field
                    name={'toPrice'}
                    component={promoSelect}
                    placeholder={'До'}
                    options={options}
                    side={'right'}
                    />
                </div> */}
                </div>
                <button className="promo__form__btn" type="submit">
                  Пошук
                </button>
              </Form>
            </Formik>
          </div>
          <div className="promo__wrapper-right">
            <div className="promo__wrapper-right-blue"></div>
            <div className="promo__wrapper-right-orange"></div>
            <div className="promo__wrapper-right-red"></div>
            <div className="promo__image">
              <Image
                className="promo__image-block"
                objectFit="cover"
                layout="fill"
                loading="eager"
                src="/assets/images/hero-main-bg.jpg"
              />
            </div>
            <div className="promo__image-mob">
              <img
                className="promo__image-mob-block"
                src="/assets/images/hero-min.jpg"
                alt="image-mob"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Promo
