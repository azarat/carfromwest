import axios from 'axios';
import { NextApiHandler } from 'next'
import clientPromise from '../../mongodb/mongodb'

const lotDetails: NextApiHandler = async (req, res) => {
    // GET request
    if (req.method == 'GET') {
        const queryParamsGet = req.query;
        const url = `http://46.101.185.57:8080/search/v1/lots/${queryParamsGet.auction}/${queryParamsGet.lotNumber}`
      
      try {
        const lotDetails = await axios.get(url, {
            headers: {
                'Authorization': "Basic Y2Z3ODpQWmwwZWcsQjky",
                'X-AUTH-TOKEN': "1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82",
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
            }
        })
    
        return res.status(200).send(lotDetails.data)
      } catch (e) {
        return res.status(500).send( e )
      }
    }

    // POST request
    if (req.method == 'POST') {
        const client = await clientPromise
        const db = client.db("cfwdata")
        const queryParamsPost = req.body;

        try {
            
            const lotDetails = await db.collection('lots').updateOne({
                lotNumber: queryParamsPost.lotNumber,
                auction: queryParamsPost.auction
            }, {
                $set: {
                    "saleInfo.saleDocument.group": queryParamsPost.carDetailedObject.saleInfo.saleDocument.group,
                    "saleInfo.saleDocument.state": queryParamsPost.carDetailedObject.saleInfo.saleDocument.state,
                    "saleInfo.saleDocument.type": queryParamsPost.carDetailedObject.saleInfo.saleDocument.type,

                    "saleInfo.seller.group": queryParamsPost.carDetailedObject.saleInfo.seller.group,
                    "saleInfo.seller.displayName": queryParamsPost.carDetailedObject.saleInfo.seller.displayName,

                    "conditionInfo.keys": queryParamsPost.carDetailedObject.conditionInfo.keys,

                    "specifications.bodyStyle.name": queryParamsPost.carDetailedObject.specifications.bodyStyle.name,
                    "specifications.bodyStyle.type": queryParamsPost.carDetailedObject.specifications.bodyStyle.type,
                }
            })
            return res.status(200).send(lotDetails)
        } catch (e) {
            return res.status(500).send( e )
        }
    }
}

export default lotDetails
