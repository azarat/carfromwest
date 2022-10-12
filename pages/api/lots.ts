import { NextApiHandler } from 'next'
// import { USER_AGENT } from '../../src/constants/userAgent'
import clientPromise from '../../mongodb/mongodb'

const filter: NextApiHandler = async (req, res) => {
  try {
    if (
      req.query.searchTerm &&
      !req.query?.searchTerm.toString().match(/[0-9A-Za-z]/gi)
    ) {
      return res.status(200).send({ items: [] })
    }

    const client = await clientPromise
    const db = client.db("cfwdata")
    const dbLots = await db.collection('lots')
        .find({}).limit(12).toArray()
    console.log(dbLots);
    
    // return res.status(200).send(dbLots);

    // const url = `http://46.101.185.57:8080/search/v1/lots`
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'user-agent': req.headers['user-agent'] || USER_AGENT,
    //     Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
    //     'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(req.body),
    // })

    // const data = await response.text()
    return res.status(200).send(dbLots)
  } catch (e) {
    return res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
