import { NextApiHandler } from 'next'
import clientPromise from '../../mongodb/mongodb'

const filter: NextApiHandler = async (req, res) => {

  const nPerPage = 12;
  const pageNumber = +req.query.page;
  const client = await clientPromise
  const db = client.db("cfwdata")
 

  const queryParamsSet = <any> [{
            $gte: [
              { $dateFromString: { dateString: '$auctionDate' } },
              new Date()
    ]
  }] 

 const queryParams: any = {$expr: {
        $and: queryParamsSet,
    },
  }
  
    
  
    
  
  if ('make' in req.query && req.query.make !== 'undefined') {
    queryParams['lotInfo.make'] = req.query.make 
  }
  if ('model' in req.query && req.query.model !== 'undefined') {
     queryParams['lotInfo.model'] = req.query.model
  }  
  if ('fuel' in req.query && req.query.fuel !== 'undefined') {
     queryParams['specifications.fuelType'] = req.query.fuel
  }
  if ('transmissionTypes' in req.query && req.query.transmissionTypes !== 'undefined') {
     queryParams['specifications.transmissionType'] = req.query.transmissionTypes
  }
  if ('bodyStyles' in req.query && req.query.bodyStyles !== 'undefined') {
     queryParams['specifications.bodyStyle.name'] = req.query.bodyStyles
  }
  if ('condition' in req.query && req.query.condition !== 'undefined') {
     queryParams['conditionInfo.condition'] = req.query.condition
  }
  if ('driveLineTypes' in req.query && req.query.driveLineTypes !== 'undefined') {
     queryParams['specifications.drivelineType'] = req.query.driveLineTypes
  }
  if ('sellerType' in req.query && req.query.sellerType !== 'undefined' && req.query.sellerType !== 'other') {
    queryParams['saleInfo.seller.group'] = req.query.sellerType
  }
  if ('damageTypes' in req.query && req.query.damageTypes !== 'undefined') {
    queryParams['conditionInfo.primaryDamage'] = req.query.damageTypes
  }  
  if ('yearStart' in req.query && req.query.yearStart !== 'undefined') {
    queryParams['lotInfo.year'] = { $gte: +req.query.yearStart }
  }
  if ('yearEnd' in req.query && req.query.yearEnd !== 'undefined') {
    queryParams['lotInfo.year'] = { $lte: +req.query.yearEnd }
  }
  if ('yearEnd' in req.query && 'yearStart' in req.query &&req.query.yearEnd !== 'undefined'  && req.query.yearStart !== 'undefined') {
    queryParams['lotInfo.year'] = {$gte: +req.query.yearStart, $lte: +req.query.yearEnd }
  }
  if ('mileageStart' in req.query && req.query.mileageStart !== 'undefined') {
    queryParams['conditionInfo.odometer.value'] = {$gte: +req.query.mileageStart }
  }
   if ('mileageEnd' in req.query && req.query.mileageEnd !== 'undefined') {
    queryParams['conditionInfo.odometer.value'] = { $lte: +req.query.mileageEnd }
  }
  if ('mileageEnd' in req.query && 'mileageStart' in req.query && req.query.mileageEnd !== 'undefined'  && req.query.mileageStart !== 'undefined') {
    queryParams['conditionInfo.odometer.value'] = {$gte: +req.query.mileageStart, $lte: +req.query.mileageEnd }
  }
  if ('engineFrom' in req.query && req.query.engineFrom !== 'undefined') {
    queryParams['specifications.engine.capacity'] = {$gte: req.query.engineFrom }
  }
   if ('engineTo' in req.query && req.query.engineTo !== 'undefined') {
    queryParams['specifications.engine.capacity'] = { $lte: req.query.engineTo }
  }
  if ('engineTo' in req.query && 'engineFrom' in req.query && req.query.engineTo !== 'undefined'  && req.query.engineFrom !== 'undefined') {
    queryParams['specifications.engine.capacity'] = {$gte: req.query.engineFrom, $lte: req.query.engineTo }
  }
  
  

  console.log(queryParams);
  

  try {
    if (
      req.query.searchTerm &&
      !req.query?.searchTerm.toString().match(/[0-9A-Za-z]/gi)
    ) {
      return res.status(200).send({ items: [] })
    }

  const dbLots = await db.collection('lots').find(queryParams).skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0).limit(nPerPage).toArray()
  const dbLotsCount = await db.collection('lots').countDocuments(queryParams);
    
  console.log(dbLotsCount);

  return res.status(200).send({dbLots, dbLotsCount})
  } catch (e) {
    return res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
