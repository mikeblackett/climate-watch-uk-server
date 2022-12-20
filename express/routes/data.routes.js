import express from 'express'
import * as aggregateControllers from '../controllers/aggregate.controllers.js'
import * as snapshotControllers from '../controllers/snapshot.controllers.js'
import * as sliceControllers from '../controllers/slice.controllers.js'
import * as rankControllers from '../controllers/rank.controllers.js'

var router = express.Router()

router.get('/aggregated/month', aggregateControllers.getMonth)
router.get('/aggregated/season', aggregateControllers.getSeason)
router.get('/aggregated/year', aggregateControllers.getYear)

router.get('/snapshot/month', snapshotControllers.getMonth)
router.get('/snapshot/season', snapshotControllers.getSeason)
router.get('/snapshot/year', snapshotControllers.getYear)

router.get('/slice/month', sliceControllers.getMonth)
router.get('/slice/season', sliceControllers.getSeason)
router.get('/slice/year', sliceControllers.getYear)

router.get('/rank/month', rankControllers.getMonth)
router.get('/rank/season', rankControllers.getSeason)
router.get('/rank/year', rankControllers.getYear)

export default router
