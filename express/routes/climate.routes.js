import express from 'express'
import * as climateControllers from '../controllers/climate.controllers.js'
import * as climateValidators from '../validators/climate.validators.js'

var router = express.Router()

router.get('/', climateValidators.getSnapshot, climateControllers.getSnapshot)

export default router
