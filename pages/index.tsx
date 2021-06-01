import { NextPage } from 'next'
import Promo from '../src/components/HomePage/Promo/Promo'
import AboutUs from '../src/components/HomePage/AboutUs/AboutUs'
import Request from '../src/components/HomePage/Request/Request'
import PopularAuto from '../src/components/PopularAuto/PopularAuto'
import Advantages from '../src/components/HomePage/Advantages/Advantages'
import FormBlock from '../src/components/HomePage/FormBlock/FormBlock'
import Video from '../src/components/HomePage/Video/Video'
import MainPageTimeLine from '../src/components/HomePage/MainPageTimeLine/MainPageTimeLine'
import WorkSum from '../src/components/HomePage/WorkSum/WorkSum'
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
      <Advantages />
      <FormBlock />
      <MainPageTimeLine />
      <Video />
      <WorkSum />
    </>
  )
}
export default IndexPage
