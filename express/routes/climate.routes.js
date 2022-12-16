import express from 'express'
import * as climateControllers from '../controllers/climate.controllers.js'
import * as climateValidators from '../validators/climate.validators.js'

var router = express.Router()

router.get('/', climateValidators.getSnapshot, climateControllers.getSnapshot)
router.get(
  '/max',
  climateValidators.getMaxMonth,
  climateControllers.getMaxMonth
)

export default router
