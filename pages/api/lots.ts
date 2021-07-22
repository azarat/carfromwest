import { NextApiHandler } from 'next'

const filter: NextApiHandler = async (req, res) => {
  try {
    if (
      req.query.searchTerm &&
      !req.query?.searchTerm.toString().match(/[0-9A-Za-z]/gi)
    ) {
      return res.status(200).send({ data: [] })
    }
    req.body

    const url = `https://api-stage.carsfromwest.com/search/v1/lots`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
        'X-AUTH-TOKEN': '1d21e20bd0b8d46297b102d28d5d070eb9b626c3',
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.text()
    return res.status(200).send(data)
  } catch (e) {
    return res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
