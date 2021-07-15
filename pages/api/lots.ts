import { NextApiHandler } from 'next'

const filter: NextApiHandler = async (req, res) => {
  try {
    if (
      req.query.searchTerm &&
      !req.query?.searchTerm.toString().match(/[0-9A-Za-z]/gi)
    ) {
      return res.status(200).send({ data: [] })
    }

    const queryParams = Object.keys(req.query)
      .map((key) => `${key}=${req.query[key]}`)
      .join('&')

    const url = `https://api-stage.carsfromwest.com/search/v1/lots?${queryParams}`
    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic cfw8/PZl0eg,B92',
        'X-AUTH-TOKEN': '1d21e20bd0b8d46297b102d28d5d070eb9b626c3',
      },
    })
    const data = await response.json()

    return res.status(200).send(data)
  } catch (e) {
    console.log(e)
    return res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
