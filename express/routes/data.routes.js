import express from 'express'
import {
  getSnapshotMonth,
  getSnapshotSeason,
  getSnapshotYear,
} from '../controllers/snapshot.controllers.js'
import {
  validateSnapshotMonth,
  validateSnapshotSeason,
  validateSnapshotYear,
} from '../validators/snapshot.validators.js'
import {
  getSliceMonth,
  getSliceSeason,
  getSliceYear,
} from '../controllers/slice.controllers.js'
import {
  validateSliceMonth,
  validateSliceSeason,
  validateSliceYear,
} from '../validators/slice.validators.js'
import {
  getAggregateMonth,
  getAggregateSeason,
  getAggregateYear,
} from '../controllers/aggregate.controllers.js'
import {
  validateAggregateMonth,
  validateAggregateSeason,
  validateAggregateYear,
} from '../validators/aggregate.validators.js'
import * as rankControllers from '../controllers/rank.controllers.js'
import * as extremeControllers from '../controllers/extreme.controllers.js'
import * as anomalyControllers from '../controllers/anomaly.controllers.js'

var router = express.Router()

router.get('/snapshot/month', validateSnapshotMonth, getSnapshotMonth)
router.get('/snapshot/season', validateSnapshotSeason, getSnapshotSeason)
router.get('/snapshot/year', validateSnapshotYear, getSnapshotYear)

router.get('/slice/month', validateSliceMonth, getSliceMonth)
router.get('/slice/season', validateSliceSeason, getSliceSeason)
router.get('/slice/year', validateSliceYear, getSliceYear)

router.get('/aggregated/month', validateAggregateMonth, getAggregateMonth)
router.get('/aggregated/season', validateAggregateSeason, getAggregateSeason)
router.get('/aggregated/year', validateAggregateYear, getAggregateYear)

router.get('/max/month', extremeControllers.getMaxMonth)
router.get('/max/season', extremeControllers.getMaxSeason)
router.get('/max/year', extremeControllers.getMaxYear)

router.get('/min/month', extremeControllers.getMinMonth)
router.get('/min/season', extremeControllers.getMinSeason)
router.get('/min/year', extremeControllers.getMinYear)

router.get('/rank/month', rankControllers.getMonth)
router.get('/rank/season', rankControllers.getSeason)
router.get('/rank/year', rankControllers.getYear)

router.get('/anomaly/month', anomalyControllers.getMonthAnomaly)

export default router
