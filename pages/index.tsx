import { NextPage } from 'next'
import Promo from '../src/components/HomePage/Promo/Promo'
import AboutUs from '../src/components/HomePage/AboutUs/AboutUs'
import Request from '../src/components/HomePage/Request/Request'
import PopularAuto from '../src/components/PopularAuto/PopularAuto'
import ClientReviews from '../src/components/HomePage/ClientsReview/ClientReviews'
import Faq from '../src/components/HomePage/Faq/Faq'
import CheckAuto from '../src/components/HomePage/CheckAuto/CheckAuto'
import Consult from '../src/components/HomePage/Consult/Consult'

const IndexPage: NextPage = () => {
  return (
    <>
      <Promo />
      <AboutUs />
      <Request />
      <PopularAuto />
      <ClientReviews />
      <Faq />
      <CheckAuto />
      <Consult />
    </>
  )
}
export default IndexPage
