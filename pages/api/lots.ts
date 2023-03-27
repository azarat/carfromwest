import { NextApiHandler } from 'next'
import clientPromise from '../../mongodb/mongodb'

const filter: NextApiHandler = async (req, res) => {

  const nPerPage = 12;
  const pageNumber = Number(req.query.page);
  
  const client = await clientPromise
  const db = client.db("cfwdata")
  const sortValue = <any> {};
 
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
     queryParams['specifications.transmissionType'] = new RegExp(req.query.transmissionType.toString(), 'i')  
  }
  if ('bodyStyle' in req.query) {
     queryParams['specifications.bodyStyle.type'] = req.query.bodyStyle
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
    queryParams['conditionInfo.primaryDamage'] = new RegExp(req.query.primaryDamage.toString(), 'i') 
  }  
  if ('yearStart' in req.query) {
    queryParams['$expr'] = {
          $gte: [
            {
              $toDouble: "$lotInfo.year",
            },
            parseInt(req.query.yearStart.toString())
          ]
    }
  }
  if ('toYear' in req.query) {
     queryParams['$expr'] = {
          $lte: [
            {
              $toDouble: "$lotInfo.year",
            },
            parseInt(req.query.toYear.toString())
          ]
    }
  }
  if ('toYear' in req.query && 'yearStart' in req.query) {
    queryParams['lotInfo.year'] = {$gte: req.query.yearStart, $lte: req.query.toYear }
  }
  if ('odometerMin' in req.query) {
    queryParams['conditionInfo.odometer.value'] = {$gte: Number(req.query.odometerMin) }
  }
   if ('odometerMax' in req.query) {
    queryParams['conditionInfo.odometer.value'] = { $lte: Number(req.query.odometerMax) }
  }
  if ('odometerMax' in req.query && 'odometerMin' in req.query) {
    queryParams['conditionInfo.odometer.value'] = {$gte: Number(req.query.odometerMin), $lte: Number(req.query.odometerMax) }
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
    if (req.query.searchTerm.length == 8 && !isNaN(Number(req.query.searchTerm))) {
       queryParams['$expr'] = {
        $eq: [
          {
            $toDouble: "$lotNumber",
          },
          parseInt(req.query.searchTerm.toString())
        ]
      };
      
      // queryParams['lotNumber'] = req.query.searchTerm
    }
    if (req.query.searchTerm.length == 17) {
      const slicedVin = req.query.searchTerm.slice(0, 11) + '******'
      queryParams['$expr'] = {
        $eq: [
           '$lotInfo.vin', slicedVin.toUpperCase()
        ]
      };
      // queryParams['lotInfo.vin'] = slicedVin /* new RegExp(slicedVin, 'i')  */
    }
    if (isNaN(Number(req.query.searchTerm)) && req.query.searchTerm.length < 17 || req.query.searchTerm.length > 17) {
      queryParams['lotInfo.make'] = new RegExp(req.query.searchTerm.toString(), 'i')
    }
  }

  
  if ('sortField' in req.query) {
    if (req.query.sortField == 'auction-date--asc') {
      sortValue['auctionDate'] = 1;
    }
    if (req.query.sortField == 'auction-date--desc') {
      sortValue['auctionDate'] = -1;
    }
    if (req.query.sortField == 'added-date--asc') {
      sortValue['lotNumber'] = 1;
    }
    if (req.query.sortField == 'added-date--desc') {
      sortValue['lotNumber'] = -1;
    }
    if (req.query.sortField == 'current-bid--asc') {
      sortValue['saleInfo.currentBid.value'] = 1;
    }
    if (req.query.sortField == 'current-bid--desc') {
     sortValue['saleInfo.currentBid.value'] = -1;
    }
    if (req.query.sortField == 'year--asc') {
      sortValue['lotInfo.year'] = 1;
    }
    if (req.query.sortField == 'year--desc') {
      sortValue['lotInfo.year'] = -1;
    }
    if (req.query.sortField == 'odometer--asc') {
      sortValue['conditionInfo.odometer.value'] = 1;
    }
    if (req.query.sortField == 'odometer--desc') {
     sortValue['conditionInfo.odometer.value'] = -1;
    }
  }

  try {
    if (
      req.query.searchTerm &&
      !req.query?.searchTerm.toString().match(/[0-9A-Za-z]/gi)
    ) {
      return res.status(200).send({ items: [] })
    }
    
    console.log(queryParams, 'queryParams')
    const dbLots = await db.collection('lots').find(queryParams).skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0).limit(nPerPage).sort(sortValue).toArray()
    const dbLotsCountArr = await db.collection('lots').aggregate([/* { $match: queryParams }, */ {$count: 'count'}]).toArray();
    const dbLotsCount = dbLotsCountArr[0].count
    // console.log(dbLots, 'dbLots')
    return res.status(200).send({dbLots, dbLotsCount})
  } catch (e) {
    return res.status(500).send({ message: 'Server Error' })
  }
}

export default filter
