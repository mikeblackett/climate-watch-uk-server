import express from 'express'
import { getSnapshotMonthInYear, getSnapshotYear } from '../api/snapshot.api.js'

var router = express.Router()

router.get('/month', getSnapshotMonthInYear)
router.get('/year', getSnapshotYear)
// router.get('/snapshot/year', getSnapshotYearApi)
// router.get('/rank', getRank)
// router.get('/ranks', getRanks)

export default router
