import { NextApiHandler } from 'next'
import clientPromise from '../../../mongodb/mongodb'

const filter: NextApiHandler = async (req, res) => {
  try {
    const model = req.body.currentModel;
    const client = await clientPromise
    const queryParams = <any>{};
    
    queryParams['lotInfo.model'] = model
    const db = client.db("cfwdata")
    const dbFilteredData = await db.collection('lots').find(queryParams).toArray()
    const bodystyles = dbFilteredData.map(item => item.specifications
      .bodyStyle.type)
    
    const uniqueBodystyles = new Set(bodystyles)
    
    res.status(200).send([...uniqueBodystyles])
  } catch (e) {
    res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
