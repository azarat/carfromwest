import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  let msg = "Заявка с сайта\r\n"
  if (req.body.hasOwnProperty("title"))
    msg = req.body.title + "\r\n";
  if (req.body.hasOwnProperty("initialLink"))
    msg += "Url: " + req.body.initialLink + "\r\n";
  if (req.body.hasOwnProperty("name"))
    msg += "Имя: " + req.body.name + "\r\n";
  if (req.body.hasOwnProperty("phone"))
    msg += "Phone: " + req.body.phone + "\r\n";
  if (req.body.hasOwnProperty("wishes"))
    msg += "Wishes: " + req.body.wishes + "\r\n";
  if (req.body.hasOwnProperty("type"))
    msg += "Type: " + req.body.type + "\r\n";

  const endpoint = 'https://api.telegram.org/bot' + process.env.botKey + '/sendMessage';

  const data = {
    chat_id: '@cfwrequests',
    text: msg
  };

  const u = new URLSearchParams(data).toString();

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const response = await fetch(endpoint + "?" + u, options)

  const result = await response.json()

  res.status(200).json(result)
}

export default handler;