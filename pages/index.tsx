import { NextPage } from 'next'
import Promo from '../src/components/HomePage/Promo/Promo'
import AboutUs from '../src/components/HomePage/AboutUs/AboutUs'
import Request from '../src/components/HomePage/Request/Request'

const IndexPage: NextPage = () => {
  return (
    <>
      <Promo />
      <AboutUs />
      <Request />
    </>
  )
}
export default IndexPage
