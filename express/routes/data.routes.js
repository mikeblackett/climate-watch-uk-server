import express from 'express'
import { getSnapshot, snapshotValidator } from '../api/snapshot.api.js'

var router = express.Router()
router.get('/snapshot', snapshotValidator(), getSnapshot)

export default router
