import { NextApiHandler } from 'next'
import cacheData from 'memory-cache'

const filter: NextApiHandler = async (req, res) => {
  try {
    const queryParams = Object.keys(req.query)
      .map((key) => `${key}=${req.query[key]}`)
      .sort()
      .join('&')

    let data = cacheData.get(queryParams)

    if (!data) {
      const url = `https://api.carsfromwest.com/search/v1/filters?${queryParams}&auctions=iaai,copart`
      const response = await fetch(url, {
        headers: {
          Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
          'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
        },
      })
      data = await response.json()
      cacheData.put(queryParams, data, 1000 * 60 * 60)
    }
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
