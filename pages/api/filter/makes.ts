import { NextApiHandler } from 'next'
import clientPromise from '../../../mongodb/mongodb'

const filter: NextApiHandler = async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db("cfwdata")
    const dbFilteredData = await db.collection('lots')
      .distinct('lotInfo.make')
    res.status(200).send(dbFilteredData)
  } catch (e) {
    res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
