import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Select from 'react-select'
import { Formik, Field, FieldProps, Form } from 'formik'
import { useRouter } from 'next/router'
import Spinner from '../../Spinner/Spinner'
import { years } from '../../../constants/filter'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { updateOptionsTree } from '../../../../store/actions/optionsTree'

type CustomSelectProps = {
  options: any
  placeholder?: string
  side?: string
  setter?: (e: any) => void
}

const Promo: React.FC = (): JSX.Element => {
  const router = useRouter()
  const [marks, setMarks] = useState([])
  const [models, setModels] = useState([])
  const [currentMark, setCurrentMark] = useState('')
  const [currentModel, setCurrentModel] = useState('')
  const [fromYear, setFromYear] = useState<number>(0)
  const [toYear, setToYear] = useState<number>(2021)
  const [isLoading, setLoading] = useState(false)

  const optionsTree = useSelector(
    (state: any) => state.optionsTree.optionsTree ?? []
  )

  const dispatchRedux = useDispatch()

  const firstYears = years.filter((year) => year.value < toYear)
  const secondYears = years.filter((year) => year.value > fromYear)

  const getMarks = async () => {
    setLoading(true)
    const url = `/api/filter?filters=makes`

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
          setMarks(
            response.data.makes.sort().map((val: string) => ({
              label: val,
              value: val,
            }))
          )

          const mappedOptionsTree = optionsTree.map((item: any) => item.title)

          const filteredMarks = response.data.makes.filter((val: string) => {
            return !mappedOptionsTree.includes(val)
          })

          dispatchRedux(
            updateOptionsTree(
              optionsTree.concat(
                filteredMarks.map((val: any) => ({
                  title: val,
                  models: [],
                }))
              )
            )
          )
        }
      } catch (error) {
        setMarks([])
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    getMarks()
    // const url = `/api/filter?filters=makes`
    // setLoading(true)
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((json) =>
    //     setMarks(
    //       json?.makes.sort().map((val: string) => ({
    //         label: val,
    //         value: val,
    //       })) || []
    //     )
    //   )
    //   .catch(() => setMarks([]))
    //   .finally(() => setLoading(false))
  }, [])

  const getModels = async () => {
    setLoading(true)
    const url = `/api/filter?filters=makes,models&makes=${currentMark}`
    try {
      const response = await axios.get(url)
      if (response.status == 200) {
        setModels(
          response.data.models.sort().map((val: string) => ({
            label: val,
            value: val,
          }))
        )

        // const mappedOptionsTree = optionsTree.map((item: any) => item.title)

        // const filteredModels = response.data.models.filter((val: string) => {
        //   return !mappedOptionsTree.includes(val)
        // })

        // console.log(response.data.models)

        // dispatchRedux(
        //   updateOptionsTree(
        //     optionsTree.concat(
        //       response.data.models.map((val: any) => ({
        //         title: val,
        //         models: val,
        //       }))
        //     )
        //   )
        // )
      }
    } catch (error) {
      setModels([])
    }

    setLoading(false)
  }

  useEffect(() => {
    if (currentMark && !currentModel) {
      getModels()
      // const url = `/api/filter?filters=makes,models&makes=${currentMark}`
      // fetch(url)
      //   .then((res) => res.json())
      //   .then((json) => {
      //     setModels(
      //       json?.models.sort().map((val: string) => ({
      //         label: val,
      //         value: val,
      //       })) || []
      //     )
      //   })
      //   .catch(() => setModels([]))
      //   .finally(() => setLoading(false))
    }
  }, [currentMark])

  const handleSubmit = (values: any) => {
    setLoading(true)

    let url = ''
    if (values.makes) url += `/brand-is-${values.makes}`
    if (values.models) url += `/model-is-${values.models}`
    if (values.fromYear) url += `/yearStart-is-${values.fromYear}`
    if (values.toYear) url += `/yearEnd-is-${values.toYear}`
    router.push('/catalog' + url)
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
                makes: '',
                models: '',
                fromYear: '',
                toYear: '',
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
                    name={'makes'}
                    component={promoSelect}
                    placeholder={'Марка'}
                    options={marks}
                    side={'left'}
                    setter={setCurrentMark}
                  />

                  <Field
                    name={'models'}
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
                      name={'fromYear'}
                      component={promoSelect}
                      placeholder={'Від'}
                      options={firstYears}
                      setter={setFromYear}
                      side={'right'}
                    />

                    <Field
                      name={'toYear'}
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
                src="/assets/images/hero.png"
              />
            </div>
            <div className="promo__image-mob">
              <img
                className="promo__image-mob-block"
                src="/assets/images/hero.png"
              />
            </div>
          </div>
          {/* <div
            role="presentation"
            className="promo__video"
          >
            <div className="promo__video-image">
              <span className="promo__video-play-button" />
            </div>
            <div className="promo__video-link">
              <ArrowLinkSVG />
              <button onClick={handleFormOpen} className="promo__button">
                Подобрать авто
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Promo
