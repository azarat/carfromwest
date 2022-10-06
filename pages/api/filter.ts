import { NextApiHandler } from 'next'
import { USER_AGENT } from '../../src/constants/userAgent'
import clientPromise from '../../mongodb/mongodb'

const filter: NextApiHandler = async (req, res) => {
  try {
    const queryParams = Object.keys(req.query)
      .map((key) => `${key}=${req.query[key]}`)
      .sort()
      .join('&')
    
    const client = await clientPromise
    const db = client.db("cfwdata")
    const dbFilteredData = await db.collection('filters')
      .find({ title: 'test'}).toArray()
    console.log(dbFilteredData);
    
    
    // return res.status(200).send(dbFilteredData);

    const url = `http://46.101.185.57:8080/search/v1/filters?${queryParams}&auctions=iaai,copart`

    const response = await fetch(url, {
      headers: {
        'user-agent': req.headers['user-agent'] || USER_AGENT,
        Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
        'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
      },
    })
    const data = await response.json()
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
