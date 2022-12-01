import express from 'express'
import { getClimateSummary } from '../api/data.api.js'

var router = express.Router()

router.get('/summary', getClimateSummary)

export default router
