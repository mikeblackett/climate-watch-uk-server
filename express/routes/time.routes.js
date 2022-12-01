import express from 'express'
import { getAllTimes, getTimesById, getAllYears } from '../api/time.api.js'

var router = express.Router()

router.get('/', getAllTimes)
// router.get('/:id', getTimesById)
router.get('/years', getAllYears)

export default router
