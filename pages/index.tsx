import { NextPage } from 'next'
import Promo from '../src/components/HomePage/Promo/Promo'
import AboutUs from '../src/components/HomePage/AboutUs/AboutUs'
import Request from '../src/components/HomePage/Request/Request'
import PopularAuto from '../src/components/PopularAuto/PopularAuto'
import ClientReviews from '../src/components/HomePage/ClientsReview/ClientReviews'

const IndexPage: NextPage = () => {
  return (
    <>
      <Promo />
      <AboutUs />
      <Request />
      <PopularAuto />
      <ClientReviews />
    </>
  )
}
export default IndexPage
