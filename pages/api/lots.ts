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
    
  if ('make' in req.query) {
    queryParams['lotInfo.make'] = req.query.make
  }
  if ('model' in req.query) {
     queryParams['lotInfo.model'] = req.query.model
  }  
  if ('fuelType' in req.query) {
     queryParams['specifications.fuelType'] = req.query.fuelType
  }
  if ('transmissionType' in req.query) {
     queryParams['specifications.transmissionType'] = req.query.transmissionType
  }
  if ('bodyStyle' in req.query) {
     queryParams['specifications.bodyStyle.name'] = req.query.bodyStyle
  }
  if ('condition' in req.query) {
     queryParams['conditionInfo.condition'] = req.query.condition
  }
  if ('driveLineType' in req.query) {
     queryParams['specifications.drivelineType'] = req.query.driveLineType
  }
  if ('sellerType' in req.query && req.query.sellerType !== 'other') {
    queryParams['saleInfo.seller.group'] = req.query.sellerType
  }
  if ('primaryDamage' in req.query) {
    queryParams['conditionInfo.primaryDamage'] = req.query.primaryDamage
  }  
  if ('yearStart' in req.query) {
    queryParams['lotInfo.year'] = { $gte: +req.query.yearStart }
  }
  if ('yearEnd' in req.query) {
    queryParams['lotInfo.year'] = { $lte: +req.query.yearEnd }
  }
  if ('yearEnd' in req.query && 'yearStart' in req.query) {
    queryParams['lotInfo.year'] = {$gte: +req.query.yearStart, $lte: +req.query.yearEnd }
  }
  if ('odometerMin' in req.query) {
    queryParams['conditionInfo.odometer.value'] = {$gte: +req.query.odometerMin }
  }
   if ('odometerMax' in req.query) {
    queryParams['conditionInfo.odometer.value'] = { $lte: +req.query.odometerMax }
  }
  if ('odometerMax' in req.query && 'odometerMin' in req.query) {
    queryParams['conditionInfo.odometer.value'] = {$gte: +req.query.odometerMin, $lte: +req.query.odometerMax }
  }
  if ('engineFrom' in req.query) {
    queryParams['specifications.engine.capacity'] = {$gte: req.query.engineFrom }
  }
   if ('engineTo' in req.query) {
    queryParams['specifications.engine.capacity'] = { $lte: req.query.engineTo }
  }
  if ('engineTo' in req.query && 'engineFrom' in req.query) {
    queryParams['specifications.engine.capacity'] = {$gte: req.query.engineFrom, $lte: req.query.engineTo }
  }
  if ('searchTerm' in req.query) {    
    if (req.query.searchTerm.length == 8 && !isNaN(+req.query.searchTerm) ) { queryParams['lotNumber'] = req.query.searchTerm }
    if (req.query.searchTerm.length == 17) { queryParams['lotInfo.vin'] = req.query.searchTerm }
    if( isNaN(+req.query.searchTerm) && req.query.searchTerm.length < 17 || req.query.searchTerm.length > 17 ) { queryParams['lotInfo.make'] = req.query.searchTerm
 }
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
    

  return res.status(200).send({dbLots, dbLotsCount})
  } catch (e) {
    return res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
