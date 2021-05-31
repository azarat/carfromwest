import Spinner from '../Spinner/Spinner'
import DesktopCarousel from './DesktopCarousel'
import MobileCarousel from './MobileCarousel'
import { ISimilarCar } from '../../Types/Types'
import TabletCarousel from './TabletCarousel'

const SimilarCar: React.FC<ISimilarCar> = ({ data, loading }): JSX.Element => {
  if (loading) {
    return <Spinner />
  }

  return (
    <div className="similar">
      <div className="container">
        <h2 className="title">
          <span className="title-bg"></span>
          <span className="title-text">ПОХОЖИЕ АВТОМОБИЛИ</span>
        </h2>
        {data && <DesktopCarousel data={data} />}
        {data && <MobileCarousel data={data} />}
        {data && <TabletCarousel data={data} />}
      </div>
    </div>
  )
}

export default SimilarCar
