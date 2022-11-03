import express from 'express'
import {
  getAllTimesApi,
  getTimesByIdApi,
} from '../controllers/time.controller.js'

var router = express.Router()

router.get('/', getAllTimesApi)
router.get('/:id', getTimesByIdApi)

export default router
