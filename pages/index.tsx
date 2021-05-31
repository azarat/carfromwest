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

const IndexPage: NextPage = () => {
  return (
    <>
      <Promo />
      <AboutUs />
      <Request />
      <PopularAuto />
      <Advantages />
      <FormBlock />
      <MainPageTimeLine />
      <Video />
      <WorkSum />
    </>
  )
}
export default IndexPage
