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
import {
  getMaxMonth,
  getMaxSeason,
  getMaxYear,
  getMinMonth,
  getMinSeason,
  getMinYear,
} from '../controllers/extreme.controllers.js'
import {
  validateExtremeMonth,
  validateExtremeSeason,
  validateExtremeYear,
} from '../validators/extreme.validators.js'

import {
  getRankMonth,
  getRankSeason,
  getRankYear,
} from '../controllers/rank.controllers.js'
import {
  validateRankMonth,
  validateRankSeason,
  validateRankYear,
} from '../validators/rank.validators.js'

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

router.get('/max/month', validateExtremeMonth, getMaxMonth)
router.get('/max/season', validateExtremeSeason, getMaxSeason)
router.get('/max/year', validateExtremeYear, getMaxYear)

router.get('/min/month', validateExtremeMonth, getMinMonth)
router.get('/min/season', validateExtremeSeason, getMinSeason)
router.get('/min/year', validateExtremeYear, getMinYear)

router.get('/rank/month', validateRankMonth, getRankMonth)
router.get('/rank/season', validateRankSeason, getRankSeason)
router.get('/rank/year', validateRankYear, getRankYear)

router.get('/anomaly/month', anomalyControllers.getMonthAnomaly)

export default router
