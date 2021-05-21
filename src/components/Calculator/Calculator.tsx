import CalculatorSVG from '../../assets/svg/calculator.svg'
// Components
import { Field, Formik, Form } from 'formik'
import CustomSelect from './CustomSelect'
// Constants
import { engineTypes } from '../../constants/calculator'
import { useEffect, useState } from 'react'
import {
  calcExciseTax,
  calcFee,
  calcPDV,
  calcSum,
} from '../../helpers/calculator'

const Calculator: React.FC = () => {
  const [fee, setFee] = useState(0)
  const [exciseTax, setExciseTax] = useState(0)
  const [pdv, setPdv] = useState(0)
  const [sum, setSum] = useState(0)
  const [currencyUSD, setCurrencyUSD] = useState(0)

  useEffect(() => {
    const getCurrency = async (): Promise<void> => {
      const res = await fetch(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      )
      const result = await res.json()
      console.log('result:', result)
      const usdPrice = result.filter((item: any) => item.ccy === 'USD')[0].sale
      const eurPrice = result.filter((item: any) => item.ccy === 'EUR')[0].sale
      setCurrencyUSD(usdPrice / eurPrice)
      // setCurrencyUSD(rates.USD)
    }
    getCurrency()
  }, [])

  const handleSumbit = (values: any): void => {
    const feeResult = calcFee(values.price)
    const exciseTaxResult = Math.ceil(
      calcExciseTax(values.engine, +values.year, +values.capacity) * currencyUSD
    )
    const pdvResult = calcPDV(+values.price, feeResult, exciseTaxResult)
    const sumResult = calcSum(feeResult, exciseTaxResult, pdvResult)
    setFee(feeResult)
    setExciseTax(exciseTaxResult)
    setPdv(pdvResult)
    setSum(sumResult)
  }

  return (
    <div className="calculator">
      <div className="container">
        <div className="calculator-wrapper">
          <div className="calculator__fields">
            <div className="calculator__header">
              <CalculatorSVG />
              <h2 className="calculator__title">
                КАЛЬКУЛЯТОР РАССТАМОЖКИ АВТО
              </h2>
            </div>
            <Formik
              initialValues={{
                engine: 'gasoline',
                capacity: '',
                price: '',
                year: '',
              }}
              onSubmit={handleSumbit}
            >
              <Form>
                <div className="calculator__item">
                  <label className="calculator__label" htmlFor="engine-type">
                    Тип двигателя
                  </label>
                  <Field
                    id="engine-type"
                    component={CustomSelect}
                    options={engineTypes}
                    name="engine"
                  />
                </div>
                <div className="calculator__item">
                  <label className="calculator__label" htmlFor="capacity">
                    Объем двигателя (см3)
                  </label>
                  <Field
                    className="calculator__input"
                    type="number"
                    id="capacity"
                    name="capacity"
                    placeholder="500 - 9999"
                    min="500"
                    max="9999"
                  />
                </div>
                <div className="calculator__item">
                  <label className="calculator__label" htmlFor="price">
                    Стоимость автомобиля в USD
                  </label>
                  <Field
                    className="calculator__input"
                    type="number"
                    id="price"
                    name="price"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="calculator__item">
                  <label className="calculator__label" htmlFor="year">
                    Год выпуска автомобиля
                  </label>
                  <Field
                    className="calculator__input"
                    type="number"
                    id="year"
                    name="year"
                    placeholder="2000"
                    min="0"
                  />
                </div>
                <button className="calculator__button" type="submit">
                  Рассчитать
                </button>
              </Form>
            </Formik>
          </div>
          <div className="calculator__results">
            <h2 className="calculator__results-title">
              Стоимость расстаможки:
            </h2>
            <ul className="calculator__results-list">
              <li className="calculator__results-item">
                Акцизний налог, USD <span>{exciseTax}</span>
              </li>
              <li className="calculator__results-item">
                Ввозное мито, USD <span>{fee}</span>
              </li>
              <li className="calculator__results-item">
                ПДВ, USD <span>{pdv}</span>
              </li>
            </ul>
            <div className="calculator__results-together">
              Вместе: <span>{sum} USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
