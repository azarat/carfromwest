import { NextApiHandler } from 'next'
import clientPromise from '../../../mongodb/mongodb'

const filter: NextApiHandler = async (req, res) => {
  try {
    const make = req.body.currentMake;
    const client = await clientPromise
    const queryParams = <any>{};
    
    queryParams['lotInfo.make'] = make
    
    const db = client.db("cfwdata")
    const dbFilteredData = await db.collection('lots').find(queryParams).toArray()
    const models = dbFilteredData.map(item => item.lotInfo.model)
    const uniqueModels = new Set(models)
    
    res.status(200).send([...uniqueModels])
  } catch (e) {
    res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
