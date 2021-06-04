import { NextApiHandler } from 'next'

const filter: NextApiHandler = async (req, res) => {
  try {
    if (
      req.query.searchTerm &&
      !req.query?.searchTerm.toString().match(/[0-9A-Za-z]/gi)
    ) {
      res.status(200).send({ data: [] })
    }

    const queryParams = Object.keys(req.query)
      .map((key) => `${key}=${req.query[key]}`)
      .join('&')

    const url = `https://carsfromwest.com/api/auction/lots?${queryParams}`
    const response = await fetch(url)
    const data = await response.json()

    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
