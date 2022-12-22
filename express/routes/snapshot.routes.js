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

var router = express.Router()

router.get('/month', validateSnapshotMonth, getSnapshotMonth)
router.get('/season', validateSnapshotSeason, getSnapshotSeason)
router.get('/year', validateSnapshotYear, getSnapshotYear)

export default router
