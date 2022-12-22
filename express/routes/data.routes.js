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
import * as aggregateControllers from '../controllers/aggregate.controllers.js'
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

router.get('/aggregated/month', aggregateControllers.getMonth)
router.get('/aggregated/season', aggregateControllers.getSeason)
router.get('/aggregated/year', aggregateControllers.getYear)

router.get('/rank/month', rankControllers.getMonth)
router.get('/rank/season', rankControllers.getSeason)
router.get('/rank/year', rankControllers.getYear)

router.get('/max/month', extremeControllers.getMonthMax)
router.get('/max/season', extremeControllers.getSeasonMax)
router.get('/max/year', extremeControllers.getYearMax)

router.get('/min/month', extremeControllers.getMonthMin)
router.get('/min/season', extremeControllers.getSeasonMin)
router.get('/min/year', extremeControllers.getYearMin)

router.get('/anomaly/month', anomalyControllers.getMonthAnomaly)

export default router
