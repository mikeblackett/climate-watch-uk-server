import express from 'express'
import {
  getSnapshotMonthInYearApi,
  getSnapshotYearApi,
} from '../controllers/climate.controller.js'

var router = express.Router()

router.get('/snapshot/month', getSnapshotMonthInYearApi)
router.get('/snapshot/year', getSnapshotYearApi)

export default router
