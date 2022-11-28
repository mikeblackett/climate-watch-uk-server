import express from 'express'
import { getAllPeriods, getPeriodById } from '../api/period.api.js'

var router = express.Router()

router.get('/', getAllPeriods)
router.get('/:id', getPeriodById)

export default router
