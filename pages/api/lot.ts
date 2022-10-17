import { NextApiHandler } from 'next'
import clientPromise from '../../mongodb/mongodb'

const lot: NextApiHandler = async (req, res) => {
  
  const client = await clientPromise
  const db = client.db("cfwdata")

  const queryParams: any = {}

  if ('lotNumber' in req.query && 'auction' in req.query) {
    { queryParams['lotNumber'] = req.query.lotNumber }
    { queryParams['auction'] = req.query.auction }
  } 

  try {
    const lot = await db.collection('lots').find(queryParams).toArray()
    return res.status(200).send(lot)
  } catch (e) {
    return res.status(500).send({ message: 'Server Error' })
  }
}

export default lot
