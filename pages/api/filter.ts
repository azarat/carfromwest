import { NextApiHandler } from 'next'
import clientPromise from '../../mongodb/mongodb'

const filter: NextApiHandler = async (req, res) => {
  try {
 
    const queryParams = req.query;
    
    const client = await clientPromise
    const db = client.db("cfwdata")
    const dbFilteredData = await db.collection('filters')
      .find(queryParams).toArray()

    res.status(200).send(dbFilteredData)
  } catch (e) {
    res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
